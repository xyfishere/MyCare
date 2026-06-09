# My Care

A personal self-care web app with morning rituals, focus sessions, bedtime routines, mood notes, and lightweight stats.

## Local Use

Open `index.html` directly in a browser.

## Files

- `index.html` - app markup
- `about.html` / `about.css` / `about.js` - bilingual contact, updates, and privacy page
- `styles.css` - visual design and responsive styles
- `app.js` - app logic and local storage
- `morning-quotes.json` - editable morning quote list

## Notes

The app always stores changes locally first with `localStorage`. Optional
Supabase authentication and cloud sync can be enabled for cross-device use.

Fonts are loaded from Google Fonts. Background images are loaded from public Unsplash/Pexels URLs.

## Supabase Login And Cloud Sync

My Care uses passwordless email Magic Links. Each signed-in user has one
private JSON state row in Supabase Postgres. Before an existing cloud state is
updated or deleted, the database automatically archives the previous version
and keeps the latest 20 versions.

1. Create a Supabase project.
2. Open the Supabase SQL editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. In Supabase Authentication URL Configuration, set the Site URL and allowed
   Redirect URLs for your production domain and local development URL.
4. Copy the Project URL and public publishable/anon key into
   [`supabase-config.js`](supabase-config.js).
5. Reload the app and use the account entry in the sidebar.

Example redirect URLs:

- `https://your-domain.com/`
- `https://www.your-domain.com/`
- `http://127.0.0.1:4173/`

### Security And Licensing

- Row Level Security policies in `supabase/schema.sql` ensure users can only
  access their own row.
- The Supabase URL and publishable/anon key are intentionally public browser
  configuration. **Never** put a Supabase service-role key in this repository
  or in frontend code.
- Cloud sync is opt-in. Before sign-in, data stays on the current device.
- The account dialog can export and import portable JSON backups. Importing or
  restoring a version automatically downloads the current state first.
- Signed-in users can restore one of their latest 20 cloud versions.
- The Supabase JavaScript client is distributed under the MIT License.
- Third-party license information is recorded in
  [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Local Prototype Backend

An authenticated SQLite REST API is available in [`backend/`](backend/README.md).
It remains useful for local prototyping, while the production web app uses
Supabase Auth and Row Level Security for user-specific cloud data.
