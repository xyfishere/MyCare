-- Allow opt-in wearable/imported health summaries in family_shared_stats.
-- Run this once if sharing "Health data" fails with a summary_type constraint error.

do $$
begin
  alter table public.family_shared_stats
    drop constraint if exists family_shared_stats_summary_type_check;

  alter table public.family_shared_stats
    add constraint family_shared_stats_summary_type_check
    check (summary_type in ('skin', 'sleep', 'focus', 'goals', 'health'));
end $$;

notify pgrst, 'reload schema';
