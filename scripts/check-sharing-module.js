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
};

const snapshots = sharing.buildPersonalStatsSnapshots(state, {
  familyId: "family-1",
  periodStart: "2026-07-01",
  periodEnd: "2026-07-07",
  summaryTypes: ["skin", "sleep", "focus", "goals"],
});

assert(snapshots.length === 4, "expected one snapshot per requested type");

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
