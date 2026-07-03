-- Family shared personal-stat summaries.
-- Run this once in Supabase SQL Editor if the app says:
-- "Could not find the table 'public.family_shared_stats' in the schema cache".

create extension if not exists pgcrypto;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.family_shared_stats (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  summary_type text not null,
  payload jsonb not null default '{}'::jsonb,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.family_shared_stats
  add column if not exists family_id uuid references public.families(id) on delete cascade,
  add column if not exists owner_id uuid references auth.users(id) on delete cascade,
  add column if not exists period_start date,
  add column if not exists period_end date,
  add column if not exists summary_type text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists visible boolean not null default true,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  alter table public.family_shared_stats
    alter column family_id set not null,
    alter column owner_id set not null,
    alter column period_start set not null,
    alter column period_end set not null,
    alter column summary_type set not null;

  alter table public.family_shared_stats
    drop constraint if exists family_shared_stats_summary_type_check;
  alter table public.family_shared_stats
    add constraint family_shared_stats_summary_type_check
    check (summary_type in ('skin', 'sleep', 'focus', 'goals'));

  alter table public.family_shared_stats
    drop constraint if exists family_shared_stats_period_check;
  alter table public.family_shared_stats
    add constraint family_shared_stats_period_check
    check (period_end >= period_start);
end $$;

create unique index if not exists family_shared_stats_unique_period_idx
on public.family_shared_stats (family_id, owner_id, period_start, period_end, summary_type);

create index if not exists family_shared_stats_family_period_idx
on public.family_shared_stats (family_id, visible, period_end desc);

create index if not exists family_shared_stats_owner_idx
on public.family_shared_stats (owner_id, period_end desc);

alter table public.family_shared_stats enable row level security;

drop trigger if exists touch_family_shared_stats_before_update on public.family_shared_stats;
create trigger touch_family_shared_stats_before_update
before update on public.family_shared_stats
for each row execute function public.touch_updated_at();

drop policy if exists "Family members can read visible shared stats" on public.family_shared_stats;
create policy "Family members can read visible shared stats"
on public.family_shared_stats for select
using (
  public.is_family_member(family_id)
  and (visible = true or owner_id = auth.uid())
);

drop policy if exists "Users can create their own shared stats" on public.family_shared_stats;
create policy "Users can create their own shared stats"
on public.family_shared_stats for insert
with check (
  public.is_family_member(family_id)
  and auth.uid() = owner_id
);

drop policy if exists "Users can update their own shared stats" on public.family_shared_stats;
create policy "Users can update their own shared stats"
on public.family_shared_stats for update
using (
  public.is_family_member(family_id)
  and auth.uid() = owner_id
)
with check (
  public.is_family_member(family_id)
  and auth.uid() = owner_id
);

drop policy if exists "Users can delete their own shared stats" on public.family_shared_stats;
create policy "Users can delete their own shared stats"
on public.family_shared_stats for delete
using (
  public.is_family_member(family_id)
  and auth.uid() = owner_id
);

notify pgrst, 'reload schema';
