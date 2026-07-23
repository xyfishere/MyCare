const sharing = require("../src/modules/sharing.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const state = {
  morningEntries: [
    { date: "2026-07-01", skinState: "stable", wakeTime: "07:30", note: "private note", hunger: 6 },
    { date: "2026-07-02", skinState: "dry", wakeTime: "08:00", note: "private note", hunger: 4 },
    { date: "2026-07-03", skinState: "stable", wakeTime: "07:45", note: "private note", hunger: 5 },
  ],
  focusSessions: [
    { date: "2026-07-01", minutes: 30, category: "Study", habitSeed: "tech" },
    { date: "2026-07-02", minutes: 25, category: "Study", habitSeed: "tech" },
    { date: "2026-07-03", minutes: 15, category: "Job", habitSeed: "soft-skills" },
  ],
  workGoals: [
    { id: "goal-1", title: "Private title", status: "done", completedAt: "2026-07-02T10:00:00.000Z" },
    { id: "goal-2", title: "Private open title", status: "open", completedAt: "" },
  ],
  healthRecords: [
    { date: "2026-07-01", metric: "sleep_minutes", value: 420, metadata: { raw: "private sleep stage rows" } },
    { date: "2026-07-02", metric: "sleep_minutes", value: 450, metadata: { raw: "private sleep stage rows" } },
    { date: "2026-07-02", metric: "steps", value: 9100, metadata: { route: "private route" } },
    { date: "2026-07-03", metric: "active_minutes", value: 35 },
    { date: "2026-07-03", metric: "active_energy", value: 390 },
    { date: "2026-07-03", metric: "heart_rate", value: 78 },
    { date: "2026-07-03", metric: "resting_heart_rate", value: 62 },
    { date: "2026-07-03", metric: "heart_rate_variability", value: 45 },
  ],
};

const snapshots = sharing.buildPersonalStatsSnapshots(state, {
  familyId: "family-1",
  periodStart: "2026-07-01",
  periodEnd: "2026-07-07",
  summaryTypes: ["skin", "sleep", "focus", "goals", "health"],
});

assert(snapshots.length === 5, "expected one snapshot per requested type");

const skin = snapshots.find((item) => item.summaryType === "skin");
assert(skin.payload.totalDays === 3, "skin summary should count days");
assert(skin.payload.topStatus === "stable", "skin summary should expose top status only");
assert(!JSON.stringify(skin.payload).includes("private note"), "skin summary must not include raw notes");
assert(!JSON.stringify(skin.payload).includes("hunger"), "skin summary must not include raw hunger values");

const sleep = snapshots.find((item) => item.summaryType === "sleep");
assert(sleep.payload.recordCount === 3, "sleep summary should count wake records");
assert(sleep.payload.averageWakeTime === "07:45", "sleep summary should average wake time");

const focus = snapshots.find((item) => item.summaryType === "focus");
assert(focus.payload.minutes === 70, "focus summary should total minutes");
assert(focus.payload.sessions === 3, "focus summary should count sessions");
assert(focus.payload.topCategory === "Study", "focus summary should expose top category");
assert(focus.payload.topHabitSeed === "tech", "focus summary should expose top habit seed");

const goals = snapshots.find((item) => item.summaryType === "goals");
assert(goals.payload.completed === 1, "goal summary should count completed goals");
assert(goals.payload.open === 1, "goal summary should count open goals");
assert(!JSON.stringify(goals.payload).includes("Private title"), "goal summary must not include private goal titles");

const health = snapshots.find((item) => item.summaryType === "health");
assert(health.payload.recordCount === 8, "health summary should count imported records");
assert(health.payload.sleepRecords === 2, "health summary should count imported sleep records");
assert(health.payload.averageSleepMinutes === 435, "health summary should average sleep");
assert(health.payload.stepsTotal === 9100, "health summary should total steps");
assert(health.payload.activeMinutesTotal === 35, "health summary should total active minutes");
assert(health.payload.activeEnergyTotal === 390, "health summary should total active energy");
assert(health.payload.heartRateAverage === 78, "health summary should average heart rate");
assert(health.payload.restingHeartRateAverage === 62, "health summary should average resting heart rate");
assert(health.payload.heartRateVariabilityAverage === 45, "health summary should average HRV");
assert(!JSON.stringify(health.payload).includes("private"), "health summary must not include raw private metadata");
assert(sharing.hasSummaryData(health), "health summary with records should be shareable");

const emptyHealth = sharing.buildPersonalStatsSnapshots(state, {
  familyId: "family-1",
  periodStart: "2026-07-16",
  periodEnd: "2026-07-22",
  summaryTypes: ["health"],
})[0];
assert(emptyHealth.payload.recordCount === 0, "empty health summary should count zero records");
assert(!sharing.hasSummaryData(emptyHealth), "empty health summary should not be shareable");

const row = sharing.toSharedStatUpsert(skin, { id: "user-1" });
assert(row.family_id === "family-1", "family id should map to snake case");
assert(row.owner_id === "user-1", "owner id should come from signed-in user");
assert(row.summary_type === "skin", "summary type should map");
assert(row.visible === true, "snapshots should be visible by default");

const mapped = sharing.mapSharedStat({
  id: "shared-1",
  family_id: "family-1",
  owner_id: "user-1",
  period_start: "2026-07-01",
  period_end: "2026-07-07",
  summary_type: "focus",
  payload: { minutes: 70 },
  visible: false,
  created_at: "2026-07-01T00:00:00.000Z",
  updated_at: "2026-07-02T00:00:00.000Z",
});

assert(mapped.familyId === "family-1", "shared stat should expose familyId");
assert(mapped.ownerId === "user-1", "shared stat should expose ownerId");
assert(mapped.visible === false, "hidden shared stat should map as hidden");

console.log("Sharing module checks passed.");
