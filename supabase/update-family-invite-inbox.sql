-- Allow users with a pending invitation to read the invited family name.
-- Run this once in Supabase SQL Editor if received invitations show without a family name.

alter table public.family_invitations
  add column if not exists expires_at timestamptz;

update public.family_invitations
set expires_at = coalesce(expires_at, created_at + interval '14 days', now() + interval '14 days')
where expires_at is null;

alter table public.family_invitations
  alter column expires_at set default (now() + interval '14 days'),
  alter column expires_at set not null;

create or replace function public.has_pending_family_invitation(target_family_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.family_invitations
    where family_id = target_family_id
      and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and status = 'pending'
      and expires_at > now()
  );
$$;

drop policy if exists "Family members can read families" on public.families;
drop policy if exists "Family members and invitees can read families" on public.families;

create policy "Family members and invitees can read families"
on public.families for select
using (
  public.is_family_member(id)
  or public.has_pending_family_invitation(id)
);
