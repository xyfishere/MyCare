# Wearable Health Integration Plan

## Purpose

Add wearable and watch-derived health data to My Care without turning the app into a medical product or exposing private data by accident.

The feature should help the user notice gentle patterns, such as sleep rhythm, activity level, and recovery signals. It should not diagnose, score, or pressure the user.

## Product Boundary

- This is a wellness reflection feature, not a medical feature.
- Raw health data is private by default.
- Family members should only see summaries the user explicitly chooses to share.
- Every shared summary needs a clear preview before saving.
- The user must be able to stop sharing and disconnect a source.

## Source Strategy

### First Official API Path: Google Health API

Use Google Health API as the first direct wearable integration target because it fits a web and Supabase architecture better than device-local APIs.

Expected use:

- OAuth connection from My Care.
- Server-side token exchange and refresh handling.
- Import normalized metrics into My Care health records.
- Support Fitbit and Google/Android health ecosystem data where available.

Useful first metrics:

- Sleep sessions and sleep duration.
- Steps.
- Active minutes.
- Resting heart rate.
- Heart rate variability if available.
- Skin or body temperature trend if available.

### Apple Watch Path: Manual Import First

Apple Watch data is normally accessed through Apple Health / HealthKit on iOS. A pure web app should not assume it can directly read Apple Health data.

First Apple-friendly path:

- Add manual Apple Health export import.
- Parse selected metrics into the same normalized health record model.

Later path:

- Build an iOS companion app only if the product really needs direct Apple HealthKit sync.

### Android Path: Health Connect Later

Health Connect is strong for Android apps, but it is device-local and better suited to a native Android companion app than a static website.

Use later if My Care grows into a mobile app.

### Fitbit Legacy API

Fitbit Web API may be useful for existing Fitbit users, but it should not become the long-term primary integration if the Google Health API path is available.

## Architecture

Keep this feature separate from existing Stats and Family modules.

Suggested structure:

```text
src/modules/health-import.js
src/modules/wearable-sync.js
src/modules/wearable-summary.js
```

Suggested responsibilities:

- `health-import.js`: parse manual CSV/JSON/Apple Health XML exports and normalize records.
- `wearable-sync.js`: connect to provider APIs and fetch authorized records.
- `wearable-summary.js`: build chart-ready personal summaries and share-safe family snapshots.

Stats pages should render normalized summaries. They should not know provider-specific details.

Current first-step decision:

- The first imported health records are local-first.
- Supabase-backed raw health records should wait until the manual import UX, delete path, and privacy copy are stable.
- The module boundary now starts in `src/modules/health-import.js`.
- Personal Stats has a small CSV/JSON/XML import card that renders local sleep, steps, and active-minute previews from normalized records.
- Apple Health `export.xml` import currently supports selected Apple Watch-derived records: sleep, steps, exercise minutes, active energy, heart rate, resting heart rate, and HRV.
- Apple Health zip auto-extraction is not implemented yet; upload the `export.xml` file from inside the Apple Health export archive.
- The current UI shows a three-step Apple Watch import flow so users know not to upload the zip directly.
- Personal Stats includes a local clear-imported-data action so users can remove imported health records before any cloud sync exists.
- Any future cloud table should reuse the same normalized record shape and row mapping helpers instead of creating provider-specific records.

## Google Health OAuth Design

Direct wearable sync should require sign-in because OAuth tokens and synced health records need an owner.

Recommended flow:

1. User opens `Connect wearable` from Personal Stats.
2. User chooses Google Health and sees a plain-language permission preview.
3. Frontend redirects to a server-side OAuth start endpoint.
4. Server exchanges the authorization code and stores provider tokens in a private table.
5. Server imports only selected metrics into normalized health records.
6. Frontend reads normalized summaries, not provider-specific payloads.
7. User can disconnect the provider and delete imported cloud records.

Token storage rules:

- Never store access tokens or refresh tokens in localStorage.
- Keep token exchange and refresh in Supabase Edge Functions or another server-side service.
- Store provider tokens in a table readable only by server-side code.
- Keep raw provider payloads out of Family Stats.
- Reuse `src/modules/health-import.js` normalization before writing records.

Suggested cloud tables later:

```text
health_provider_connections
id
owner_id
provider
status
scopes
connected_at
last_synced_at
revoked_at

health_records
id
owner_id
source
source_record_id
metric
recorded_at
date
value
unit
metadata
created_at
updated_at
```

## Data Model

Use one normalized personal health records table or state collection.

```text
id
owner_id
source
source_record_id
metric
recorded_at
date
value
unit
metadata
created_at
updated_at
```

Example record:

```json
{
  "source": "google-health",
  "metric": "sleep_minutes",
  "date": "2026-07-08",
  "value": 435,
  "unit": "minutes",
  "metadata": {
    "start": "2026-07-07T23:35:00-06:00",
    "end": "2026-07-08T06:50:00-06:00"
  }
}
```

Suggested metric names:

- `sleep_minutes`
- `wake_time`
- `steps`
- `active_minutes`
- `active_energy`
- `heart_rate`
- `resting_heart_rate`
- `heart_rate_variability`
- `temperature_delta`

## Family Sharing

Never let Family Stats query raw health records directly.

Family sharing should generate summary snapshots, similar to the existing `family_shared_stats` pattern.

Shareable first summaries:

- Sleep rhythm: average sleep duration, average wake time, and simple trend.
- Activity: steps or active minutes trend.
- Recovery: optional resting heart rate or HRV trend if the user chooses it.

Avoid first:

- Raw heart rate rows.
- Exact minute-by-minute sleep stages.
- Any diagnosis-like language.
- Family ranking or comparison.

## UI Direction

Personal Stats:

- Add `Connect wearable` in the top-right when the feature is ready.
- Show `Google Health`, `Import Apple Health export`, and later `Health Connect`.
- Show exactly what will be imported before the first sync.
- Keep a `Disconnect` and `Delete imported data` action.
- Generate local, non-diagnostic trend reports from imported summaries only.

Family Stats:

- Imported health data can be shared through the existing Personal Stats sharing panel by selecting `Health data`.
- The shared payload is summary-only: average sleep, step total, active-minute total, and recovery metric counts/averages.
- The shared payload must not include raw rows, route/location details, raw Apple Health metadata, or minute-by-minute sleep stages.
- Users can still choose the sharing range: today, this week, or this month.
- Show a preview card before sharing.

## Security And Privacy

- Store provider tokens server-side only.
- Do not put refresh tokens in localStorage.
- Use Supabase Edge Functions or another server-side function for token exchange and refresh.
- Keep RLS strict: users can read/write their own raw health records only.
- Family members can read only explicitly shared summaries.
- Add clear revoke and delete paths.

## Implementation Order

1. Add normalized health record helpers and tests.
2. Add manual file import MVP for Apple Health exports and generic CSV/JSON.
3. Add Personal Stats charts for imported sleep and activity.
4. Add Google Health API OAuth design and server-side token storage.
5. Add Google Health sync for sleep and steps first.
6. Add share-safe health summaries to Family Stats.
7. Add direct Health Connect or iOS HealthKit only if a mobile companion app becomes necessary.

## Open Decisions

- Whether direct API sync should require the user to log in first.
- How long imported raw records should be retained.
- Whether family health sharing should be per-family or per-member-to-family.

## Official References

- Google Health API: https://developers.google.com/health
- Google Health API data types: https://developers.google.com/health/data-types
- Android Health Connect: https://developer.android.com/health-and-fitness/health-connect
- Apple HealthKit: https://developer.apple.com/documentation/healthkit
- Fitbit Web API: https://dev.fitbit.com/build/reference/web-api/
