-- Family anonymous secret notes.
-- Run this once in Supabase SQL Editor if the app says:
-- "Could not find the table 'public.family_secret_notes' in the schema cache".

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

create table if not exists public.family_secret_notes (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 280),
  mood text,
  visible boolean not null default true,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.family_secret_notes
  add column if not exists family_id uuid references public.families(id) on delete cascade,
  add column if not exists body text,
  add column if not exists mood text,
  add column if not exists visible boolean not null default true,
  add column if not exists created_by uuid references auth.users(id) on delete cascade,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  alter table public.family_secret_notes
    drop constraint if exists family_secret_notes_body_length_check;
  alter table public.family_secret_notes
    add constraint family_secret_notes_body_length_check
    check (char_length(trim(body)) between 1 and 280);
end $$;

create index if not exists family_secret_notes_family_visible_idx
on public.family_secret_notes (family_id, visible, created_at desc);

create index if not exists family_secret_notes_created_by_idx
on public.family_secret_notes (created_by, created_at desc);

alter table public.family_secret_notes enable row level security;

drop trigger if exists touch_family_secret_notes_before_update on public.family_secret_notes;
create trigger touch_family_secret_notes_before_update
before update on public.family_secret_notes
for each row execute function public.touch_updated_at();

drop policy if exists "Family members can read visible secret notes" on public.family_secret_notes;
create policy "Family members can read visible secret notes"
on public.family_secret_notes for select
using (
  public.is_family_member(family_id)
  and (visible = true or created_by = auth.uid())
);

drop policy if exists "Family members can create secret notes" on public.family_secret_notes;
create policy "Family members can create secret notes"
on public.family_secret_notes for insert
with check (
  public.is_family_member(family_id)
  and auth.uid() = created_by
);

drop policy if exists "Users can hide their own secret notes" on public.family_secret_notes;
create policy "Users can hide their own secret notes"
on public.family_secret_notes for update
using (
  public.is_family_member(family_id)
  and auth.uid() = created_by
)
with check (
  public.is_family_member(family_id)
  and auth.uid() = created_by
);

drop policy if exists "Users can delete their own secret notes" on public.family_secret_notes;
create policy "Users can delete their own secret notes"
on public.family_secret_notes for delete
using (
  public.is_family_member(family_id)
  and auth.uid() = created_by
);

notify pgrst, 'reload schema';
