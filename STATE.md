# Current State

Last updated: 2026-07-03

## Product

- The static web app is deployed at `https://my-care.life/`.
- Version 1 personalization and polish work is complete.
- Chinese and English switching is available across the site.
- Morning, focus, bedtime, goals, notes, Habit Garden, and statistics are functional.
- Morning wake-up time uses a custom bilingual time picker that matches the app style.
- Goals can be cleared through a guarded, bilingual new-journey reset flow.
- Focus categories and Habit Seed types can be added, renamed, recolored, and deactivated from one personalization panel.
- Focus Categories and Habit Seeds share a custom color palette that stays above the personalization dialog.
- Morning self-care includes five bilingual default quotes, and quotes can be edited, added, or deactivated from personalization settings.
- The Morning flow can open a user-defined personal calendar URL configured from personalization settings.
- The Low Energy Mode content uses a responsive, soft wellness layout with bilingual typography.
- Goals use a custom bilingual deadline calendar and support guarded single-goal deletion.
- Focus timing continues accurately when the page is not active.
- Morning quote language cleanup and Stats skin-status labels now use shared language helpers.
- Goals deadline and statistics calculations now use shared Goals domain helpers, ready for Family Goal reuse.
- User data is stored locally first.

## Data and Deployment

- Optional Magic Link authentication and cloud sync use Supabase.
- Row Level Security isolates each user's cloud state.
- Cloud history, JSON backup, import, and restore protections are available.
- Cloud writes use revision checks so a stale device cannot silently replace newer cloud data.
- Family sharing schema now defines separate families, members, invitations, family goal categories, and family goals tables.
- Personal-to-family stats sharing now has a summary-only `family_shared_stats` table and RLS foundation.
- Family data is separate from private `app_states`; RLS policies limit access to family members and invited users where appropriate.
- Goals now has separate Personal Goal and Family Goal sub-sections, keeping shared goal UI out of the personal goal flow.
- Family Goal MVP can add shared goals with deadline, separate family category, urgency, completion note, reopen, and delete actions.
- Family categories can be customized separately from personal focus categories and Habit Seeds.
- Family Secret Notes MVP lets family members leave anonymous-looking notes in the family room; the UI hides authors while the database keeps `created_by` for permissions.
- Personal Stats now has an opt-in family sharing panel with preview before saving.
- Family Stats can show family goal charts and member-grouped shared personal summary snapshots.
- Personal Stats shared summaries now show shared/not-shared status and can be stopped from the preview cards.
- Personal Stats sharing can be limited to selected summary types: skin, wake, focus, or goals.
- Personal Stats sharing can use its own range: today, this week, or this month, separate from the main Stats chart range.
- Family Stats now includes low-pressure family garden cards based only on opt-in shared summaries.
- Family Stats shared personal summaries now use visual cards for skin distribution, wake-time trend, focus minutes, and goal progress instead of text-only rows.
- Two-account family synchronization was manually tested for the current Family Sharing flow.
- GitHub `main` deploys through Cloudflare Pages.

## Current Limitations

- Family sharing still needs owner remove-member UI.
- Family goal deletion may still need a guarded confirmation if the current delete action feels too easy to tap.
- Family statistics are scaffolded separately from personal statistics and can show family goals plus opt-in shared summaries.
- Shared personal stats currently expose lightweight summaries only; richer member-level sharing rules are still future work.
- External health and wearable data cannot yet be imported.

## Repository

- Current application files are a static HTML, CSS, and JavaScript SPA.
- The app now has a small gradual module foundation under `src/`.
- `src/core/language.js` owns language-safe quote cleanup and skin label formatting.
- `src/core/storage.js` owns local JSON read/write, deep clone, and default state merging.
- `src/modules/goals.js` owns reusable goal sorting, deadline, and stats calculations.
- `src/modules/family.js` owns Supabase family operations, family goals/categories, and family secret note row mapping.
- `src/modules/sharing.js` owns summary-only personal stats snapshots for future Family Stats sharing.
- The roadmap still points to Version 2 family sharing, with owner remove-member UI and final polish remaining before external health data.
- `assets/images/my-care-linkedin-thumbnail.png` remains an unrelated untracked file.

## Latest Validation

- JavaScript syntax and diff checks pass after Family Secret Notes MVP updates.
- The local backend regression suite passes all four authentication, state, and revision-conflict tests.
- Desktop and 390px mobile layouts load successfully in a real headless browser.
- Legacy Goals, notes, custom definitions, and bilingual Quote records migrate into the current state.
- Cloud sync and JSON backup serialize the full application state and normalize restored settings.
- Goals calendar, single-goal deletion, personalization, color selection, personal calendar, and language flows were regression checked locally.
- Two-account family sync was manually tested by the user with no current blockers reported.
- `node scripts/check-phase0-language.js`, `node scripts/check-core-storage.js`, and `node scripts/check-goals-module.js` pass.
- `node scripts/check-family-schema.js` passes for the Family Sharing schema foundation.
- `node scripts/check-family-service.js` passes for family row mapping, shared goal stats, and secret note mapping.
- `node scripts/check-sharing-module.js` passes for privacy-safe personal stats snapshot generation.
- `node scripts/check-goals-stats-structure.js` passes and checks that Personal/Family Goals and Stats stay separated.
- `node --check app.js` passes after the shared-summary control update.
