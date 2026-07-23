# Active Tasks

## Phase 1 - Modular Foundation

- [x] Add shared language helpers without changing app behavior.
- [x] Keep Morning quote and Stats skin-language checks in a small script.
- [x] Extract storage helpers for local/cloud-safe state handling.
- [x] Extract small Goals and Stats domain helpers before adding more family logic.
- [x] Update `STATE.md` after the foundation pass is complete.

## Next - Family Sharing

- [x] Define family spaces, membership, and invitation flows.
- [x] Decide which Goal and Habit Seed fields can be shared.
- [x] Design shared progress without rankings or streak punishment.
- [x] Keep notes, self-care records, and health data private by default.
- [x] Add Supabase tables and Row Level Security policies.
- [x] Add a thin Family service layer for Supabase family operations.
- [x] Build create, join, and leave family flows.
- [x] Add remove-member flow for family owners.
- [x] Wire the Family Goals MVP to the Family service layer.
- [x] Add family goal title, deadline, separate family category, urgency, completion, reopen, and delete controls.
- [x] Add dedicated family category management beyond type-to-create categories.
- [x] Add Family Secret Notes MVP with anonymous display and author-owned hide action.
- [x] Add guarded family goal deletion confirmation if the MVP delete flow feels too easy to tap.
- [x] Test two-account synchronization and permission boundaries.

## Next - Personal Stats Sharing

- [x] Define opt-in, summary-only personal stats sharing.
- [x] Decide which personal data is safe to share in the first version.
- [x] Add `family_shared_stats` schema and RLS.
- [x] Add a small `sharing` service/module for summary snapshots.
- [x] Add Personal Stats share settings with preview.
- [x] Add Family Stats shared-summary display.
- [x] Add shared-summary status, stop-sharing control, and member-grouped Family Stats display.
- [x] Let users choose which personal stat summaries to share with family.
- [x] Let users choose the shared-summary time range: today, this week, or this month.
- [x] Add a low-pressure Family member overview based on opt-in shared summaries.
- [x] Convert shared personal summaries from text rows into visual Family Stats cards.

## Next - Wearable Health Data

- [x] Compare official wearable data paths and choose a first integration direction.
- [x] Write a maintainable wearable health integration plan.
- [x] Decide whether first imported health records are local-only or Supabase-backed.
- [x] Define normalized health record helpers and validation checks.
- [x] Add a manual CSV/JSON import MVP for sleep and activity.
- [x] Add direct Apple Health `export.xml` parsing for Apple Watch-derived records.
- [x] Add a clear in-app Apple Watch import flow for zip export, `export.xml`, and local-only storage.
- [x] Add Personal Stats charts for imported sleep and activity.
- [x] Add a local clear/delete control for imported health data.
- [x] Design Google Health API OAuth and server-side token storage.
- [x] Add share-safe family health summaries after personal import is stable.
- [x] Add non-diagnostic personal health trend reports for imported wearable data.
- [x] Add heart rate and active energy import/report support.
