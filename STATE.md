# Current State

Last updated: 2026-06-18

## Product

- The static web app is deployed at `https://my-care.life/`.
- Chinese and English switching is available across the site.
- Morning, focus, bedtime, goals, notes, Habit Garden, and statistics are functional.
- Morning wake-up time uses a custom bilingual time picker that matches the app style.
- Focus timing continues accurately when the page is not active.
- User data is stored locally first.

## Data and Deployment

- Optional Magic Link authentication and cloud sync use Supabase.
- Row Level Security isolates each user's cloud state.
- Cloud history, JSON backup, import, and restore protections are available.
- Cloud writes use revision checks so a stale device cannot silently replace newer cloud data.
- GitHub `main` deploys through Cloudflare Pages.

## Current Limitations

- Focus categories and Habit Seed types are fixed.
- Goals calendar styling and some bilingual behavior need refinement.
- Family sharing is not implemented.
- External health and wearable data cannot yet be imported.

## Repository

- Current application files are a static HTML, CSS, and JavaScript SPA.
- The project documentation foundation is being added locally and has not yet been pushed.
- `assets/images/my-care-linkedin-thumbnail.png` remains an unrelated untracked file.
