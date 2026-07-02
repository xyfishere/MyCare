# My Care Design Notes

This document describes how new features should be added without turning the app into a hard-to-maintain single-file product.

## Current Architecture

My Care is a static, local-first web app.

- `index.html` owns the page structure.
- `styles.css` owns the visual system.
- `app.js` currently owns most product logic, state updates, rendering, and event binding.
- `morning-quotes.json` stores editable self-care quotes.
- `supabase/schema.sql` owns cloud sync, authentication-related tables, and Row Level Security.

The next versions should keep the app lightweight, but stop adding major systems directly into `app.js`.

## Design Principles

- Personal data is private by default.
- Shared family data must be explicitly created or explicitly shared.
- Shared progress should not become ranking, pressure, or surveillance.
- AI should simplify the app, not add a second dashboard of anxiety.
- Each module should own its data shape, rendering, and event binding.
- Cross-module features should go through small shared services, not direct DOM or state coupling.

## Feature Groups

### 1. Family Collaboration

Includes:

- Family spaces.
- Family members and invitations.
- Family goals.
- Family goal categories.
- Family goal urgency.
- Family anonymous notes.

Family data should live in separate Supabase tables, not inside one user's private JSON state.

Personal goals and family goals should share UI patterns where useful, but not share the same data source.

### 2. Personal Wellness Data

Includes:

- Morning quotes and language-aware defaults.
- Skin status and hunger records.
- Focus sessions.
- Habit Seed activity.
- Watch or wearable imports.
- Health tables and reports.

Imported health data should be normalized before rendering. The app should not make medical claims.

### 3. Privacy And Sharing

Includes:

- User-controlled sharing settings.
- Shared statistics snapshots.
- Optional sharing of wearable-derived data.
- Clear UI for what is currently visible to family members.

Family members should not query raw personal records directly. If data is shared, the app should generate a limited shared view.

### 4. Future AI Lightweight Mode

Possible future AI features:

- Analyze which modules the user actually opens.
- Detect unused modules and quietly reduce their prominence.
- Suggest a smaller daily surface based on recent behavior.
- Summarize weekly patterns in gentle, non-judgmental language.

AI should rely on a small usage-event model, not scrape UI state.

Recommended event shape:

```js
{
  id: "event-id",
  type: "module_opened",
  module: "focus",
  createdAt: "2026-07-01T12:00:00.000Z",
  metadata: {}
}
```

AI-related data should be opt-in and explainable:

- What data is analyzed.
- What the AI inferred.
- What changed in the UI because of it.
- How to reset or disable it.

## Suggested Module Split

Because the app still supports simple static use, avoid a big framework migration for now.

Use small browser-safe script modules loaded by `index.html`, each exposing a narrow namespace on `window.MyCare`.

Suggested future structure:

```text
src/
  core/
    state.js
    storage.js
    i18n.js
    events.js
    dom.js
  modules/
    morning.js
    night.js
    focus.js
    goals.js
    family.js
    stats.js
    habit-seed.js
    personal-notes.js
    health-import.js
    sharing.js
  app-init.js
```

Migration should be gradual:

1. Extract pure helpers first.
2. Extract rendering functions module by module.
3. Extract event binding after rendering is stable.
4. Keep `app.js` as a compatibility shell until the app is fully modular.

Avoid a full rewrite unless the app moves to a build system.

## Data Model Direction

### Personal Local State

Keep local-first personal records in the existing state object for now:

- Morning records.
- Night records.
- Focus sessions.
- Personal goals.
- Habit Seed records.
- Personal notes.
- App settings.
- Usage events.

### Family Cloud Tables

Family collaboration should use normalized Supabase tables:

- `families`
- `family_members`
- `family_invitations`
- `family_goals`
- `family_goal_categories`
- `family_notes`
- `family_shared_stats`

Family tables need Row Level Security from the start.

### Wearable Import

First version should use file import, not direct watch APIs.

Supported first step:

- CSV or JSON import.
- Map imported fields to an internal health record format.
- Show a table and simple summary.

Possible internal shape:

```js
{
  id: "health-import-record-id",
  source: "apple-health-export",
  date: "2026-07-01",
  metric: "sleep_minutes",
  value: 430,
  unit: "minutes"
}
```

Direct Apple Health, Fitbit, Google Fit, or smartwatch API integrations can come later.

## Implementation Order

### Phase 0: Stabilize

- Fix language bugs for default quotes.
- Fix Stats skin-status language rendering.
- Add small tests or checks for language switching.
- Do not change layouts in this phase unless needed for the bug.

### Phase 1: Modular Foundation

- Add a small `src/` structure or equivalent namespace pattern.
- Extract i18n helpers.
- Extract storage helpers.
- Extract simple domain helpers for goals and stats.
- Keep behavior unchanged.

### Phase 2: Family Goals MVP

- Add Supabase family tables and RLS.
- Add family creation and invitations.
- Add family goals.
- Add family categories.
- Add urgency.
- Add completion and deletion.

### Phase 3: Family Notes

- Add anonymous family notes.
- Keep notes separate from personal future-self notes.
- Decide whether anonymity is UI-only or database-level.

### Phase 4: Wearable Import MVP

- Add manual file import.
- Normalize health metrics.
- Render a clean table.
- Add simple, non-diagnostic summaries.

### Phase 5: Privacy Sharing

- Add sharing settings.
- Add shared statistics snapshots.
- Allow family members to see only approved summaries.
- Show the user exactly what is shared.

### Phase 6: AI Lightweight Mode

- Add usage events.
- Add module registry.
- Add opt-in AI analysis later.
- Let AI recommend which modules to foreground, but keep user override.

## Risk Areas

- One large `app.js` makes unrelated regressions likely.
- Family sharing can accidentally expose private records if RLS is too broad.
- Wearable data can feel medical; copy must stay non-diagnostic.
- Anonymous family notes need a clear anonymity model.
- AI personalization can feel controlling unless it is transparent and reversible.
- Native browser controls should be restyled carefully to match the product without breaking accessibility.

## Definition Of Done For New Features

- The feature has a small data model.
- The feature has a clear owner module.
- Personal and shared data boundaries are explicit.
- Chinese and English text are both handled.
- Existing modules still work after the change.
- Local-first behavior is preserved unless the feature is explicitly cloud-only.
- Supabase policies are updated when new shared tables are added.
- The user can recover or export important personal data.
