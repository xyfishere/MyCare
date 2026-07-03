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
- [ ] Build create, join, leave, and remove-member flows.
- [x] Wire the Family Goals MVP to the Family service layer.
- [x] Add family goal title, deadline, separate family category, urgency, completion, reopen, and delete controls.
- [ ] Add dedicated family category management beyond type-to-create categories.
- [ ] Add guarded family goal deletion confirmation if the MVP delete flow feels too easy to tap.
- [ ] Test two-account synchronization and permission boundaries.

## Next - Personal Stats Sharing

- [x] Define opt-in, summary-only personal stats sharing.
- [x] Decide which personal data is safe to share in the first version.
- [x] Add `family_shared_stats` schema and RLS.
- [x] Add a small `sharing` service/module for summary snapshots.
- [x] Add Personal Stats share settings with preview.
- [x] Add Family Stats shared-summary display.
