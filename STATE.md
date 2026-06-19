# Current State

Last updated: 2026-06-18

## Product

- The static web app is deployed at `https://my-care.life/`.
- Version 1 personalization and polish work is complete.
- Chinese and English switching is available across the site.
- Morning, focus, bedtime, goals, notes, Habit Garden, and statistics are functional.
- Morning wake-up time uses a custom bilingual time picker that matches the app style.
- Goals can be cleared through a guarded, bilingual new-journey reset flow.
- Focus categories and Habit Seed types can be added, renamed, recolored, and deactivated from one personalization panel.
- Morning self-care quotes use one language-independent text field and can be edited, added, or deactivated from personalization settings.
- Goals use a custom bilingual deadline calendar and support guarded single-goal deletion.
- Focus timing continues accurately when the page is not active.
- User data is stored locally first.

## Data and Deployment

- Optional Magic Link authentication and cloud sync use Supabase.
- Row Level Security isolates each user's cloud state.
- Cloud history, JSON backup, import, and restore protections are available.
- Cloud writes use revision checks so a stale device cannot silently replace newer cloud data.
- GitHub `main` deploys through Cloudflare Pages.

## Current Limitations

- Family sharing is not implemented.
- External health and wearable data cannot yet be imported.

## Repository

- Current application files are a static HTML, CSS, and JavaScript SPA.
- The roadmap now points to Version 2 family sharing.
- `assets/images/my-care-linkedin-thumbnail.png` remains an unrelated untracked file.

## Latest Validation

- JavaScript syntax and diff checks pass.
- Legacy Goals, notes, custom definitions, and bilingual Quote records migrate into the current state.
- Cloud sync and JSON backup serialize the full application state and normalize restored settings.
- Goals calendar, single-goal deletion, personalization, and language flows were regression checked locally.
