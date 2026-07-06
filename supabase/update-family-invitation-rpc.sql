-- Create family invitations through a security-definer RPC.
-- This avoids client-side insert RLS friction while still requiring family membership.

alter table public.family_members
  add column if not exists email text;

alter table public.family_invitations
  add column if not exists accepted_by uuid references auth.users(id) on delete set null,
  add column if not exists accepted_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

update public.family_invitations
set expires_at = coalesce(expires_at, created_at + interval '14 days', now() + interval '14 days')
where expires_at is null;

alter table public.family_invitations
  alter column expires_at set default (now() + interval '14 days'),
  alter column expires_at set not null;

create or replace function public.is_family_member(target_family_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.family_members
    where family_id = target_family_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.create_family_invitation(
  p_family_id uuid,
  p_email text
)
returns public.family_invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  created_invitation public.family_invitations;
  normalized_email text;
begin
  if auth.uid() is null then
    raise exception 'Sign in is required';
  end if;

  if not public.is_family_member(p_family_id) then
    raise exception 'You must be a family member to invite people';
  end if;

  normalized_email := lower(trim(p_email));
  if normalized_email = '' then
    raise exception 'Invite email is required';
  end if;

  insert into public.family_invitations (family_id, email, invited_by)
  values (p_family_id, normalized_email, auth.uid())
  returning * into created_invitation;

  return created_invitation;
end;
$$;

grant execute on function public.create_family_invitation(uuid, text) to authenticated;

drop function if exists public.accept_family_invitation(uuid);

create or replace function public.accept_family_invitation(
  p_invitation_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  target_invitation public.family_invitations;
  accepted_invitation public.family_invitations;
  created_membership public.family_members;
  requester_email text;
begin
  if auth.uid() is null then
    raise exception 'Sign in is required';
  end if;

  requester_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  if requester_email = '' then
    raise exception 'Signed-in email is required';
  end if;

  select *
  into target_invitation
  from public.family_invitations
  where id = p_invitation_id
    and status = 'pending'
    and lower(email) = requester_email
    and expires_at > now()
  for update;

  if target_invitation.id is null then
    raise exception 'Invitation not found or expired';
  end if;

  insert into public.family_members (family_id, user_id, email, role)
  values (target_invitation.family_id, auth.uid(), requester_email, 'member')
  on conflict (family_id, user_id)
  do update set
    email = excluded.email,
    role = case
      when public.family_members.role = 'owner' then 'owner'
      else excluded.role
    end
  returning * into created_membership;

  update public.family_invitations
  set
    status = 'accepted',
    accepted_by = auth.uid(),
    accepted_at = now(),
    updated_at = now()
  where id = target_invitation.id
  returning * into accepted_invitation;

  return jsonb_build_object(
    'invitation', to_jsonb(accepted_invitation),
    'membership', to_jsonb(created_membership)
  );
end;
$$;

grant execute on function public.accept_family_invitation(uuid) to authenticated;
