-- Run this in the Supabase SQL editor if family category customization says:
-- new row violates row-level security policy for table "family_goal_categories"

create or replace function public.create_family_goal_category(
  p_family_id uuid,
  p_name text,
  p_color text default '#9eb39f'
)
returns public.family_goal_categories
language plpgsql
security definer
set search_path = public
as $$
declare
  created_category public.family_goal_categories;
begin
  if auth.uid() is null then
    raise exception 'Sign in is required';
  end if;

  if not public.is_family_member(p_family_id) then
    raise exception 'You must be a family member to edit family categories';
  end if;

  insert into public.family_goal_categories (family_id, name, color, created_by)
  values (
    p_family_id,
    trim(p_name),
    case when p_color ~ '^#[0-9A-Fa-f]{6}$' then p_color else '#9eb39f' end,
    auth.uid()
  )
  returning * into created_category;

  return created_category;
end;
$$;

create or replace function public.update_family_goal_category(
  p_category_id uuid,
  p_name text default null,
  p_color text default null,
  p_active boolean default null
)
returns public.family_goal_categories
language plpgsql
security definer
set search_path = public
as $$
declare
  target_family_id uuid;
  updated_category public.family_goal_categories;
begin
  if auth.uid() is null then
    raise exception 'Sign in is required';
  end if;

  select family_id
  into target_family_id
  from public.family_goal_categories
  where id = p_category_id;

  if target_family_id is null then
    raise exception 'Family category not found';
  end if;

  if not public.is_family_member(target_family_id) then
    raise exception 'You must be a family member to edit family categories';
  end if;

  update public.family_goal_categories
  set
    name = coalesce(nullif(trim(p_name), ''), name),
    color = case
      when p_color ~ '^#[0-9A-Fa-f]{6}$' then p_color
      else color
    end,
    active = coalesce(p_active, active)
  where id = p_category_id
  returning * into updated_category;

  return updated_category;
end;
$$;

grant execute on function public.create_family_goal_category(uuid, text, text) to authenticated;
grant execute on function public.update_family_goal_category(uuid, text, text, boolean) to authenticated;

-- PostgREST/Supabase RPC schema cache can look up named arguments in a
-- different order. This wrapper keeps the browser fallback stable while the
-- canonical function above remains easier to read.
create or replace function public.create_family_goal_category(
  p_color text,
  p_family_id uuid,
  p_name text
)
returns public.family_goal_categories
language sql
security definer
set search_path = public
as $$
  select public.create_family_goal_category(p_family_id, p_name, p_color);
$$;

grant execute on function public.create_family_goal_category(text, uuid, text) to authenticated;

drop policy if exists "Family members can read goal categories" on public.family_goal_categories;
create policy "Family members can read goal categories"
on public.family_goal_categories for select
using (public.is_family_member(family_id));

drop policy if exists "Family members can create goal categories" on public.family_goal_categories;
create policy "Family members can create goal categories"
on public.family_goal_categories for insert
with check (public.is_family_member(family_id) and (created_by is null or auth.uid() = created_by));

drop policy if exists "Family members can update goal categories" on public.family_goal_categories;
create policy "Family members can update goal categories"
on public.family_goal_categories for update
using (public.is_family_member(family_id))
with check (public.is_family_member(family_id) and (created_by is null or created_by = auth.uid() or public.is_family_owner(family_id)));

drop policy if exists "Family members can delete goal categories" on public.family_goal_categories;
create policy "Family members can delete goal categories"
on public.family_goal_categories for delete
using (public.is_family_member(family_id));

notify pgrst, 'reload schema';
