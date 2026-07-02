const goals = require("../src/modules/goals.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const today = "2026-07-01";
const records = [
  { id: "b", title: "Later", status: "open", deadline: "2026-07-20", category: "Tech", createdAt: "2026-07-01T09:00:00.000Z" },
  { id: "a", title: "Soon", status: "open", deadline: "2026-07-03", category: "Health", createdAt: "2026-07-01T09:00:00.000Z" },
  { id: "c", title: "Done", status: "done", deadline: "2026-07-05", category: "Tech", completedAt: "2026-07-02T09:00:00.000Z" },
  { id: "d", title: "Late", status: "open", deadline: "2026-06-29", category: "", createdAt: "2026-07-01T09:00:00.000Z" },
];

assert(goals.getDaysUntilDue(records[0], today) === 19, "days until due should be calendar based");
assert(goals.getDeadlineClass(records[1], today) === "soon", "due within seven days should be soon");
assert(goals.getDeadlineClass(records[2], today) === "done", "done goals should use done class");
assert(goals.getDeadlineClass(records[3], today) === "overdue", "past deadlines should be overdue");

const sorted = goals.sortGoals(records);
assert(sorted[0].id === "d" && sorted[1].id === "a", "open goals should sort by deadline first");
assert(sorted[sorted.length - 1].id === "c", "done goals should sort after open goals");

const stats = goals.buildGoalStats(records, {
  days: ["2026-07-01", "2026-07-02", "2026-07-03"],
  range: "7",
  todayDateText: today,
  uncategorizedLabel: "Uncategorized",
});

assert(stats.openGoals.length === 3, "open goal count should be correct");
assert(stats.completedInRange.length === 1, "completed in range should be counted");
assert(stats.dueSoon.length === 1, "due soon count should exclude overdue");
assert(stats.overdue.length === 1, "overdue count should be counted");
assert(stats.averageLead === 3, "average lead time should be calculated");
assert(stats.categoryTotals.Tech.total === 2, "category totals should include open and completed goals");
assert(stats.categoryTotals.Uncategorized.total === 1, "empty category should use fallback label");
assert(stats.futureGoals[0].goal.id === "a", "future goals should sort by nearest deadline");

console.log("Goals module checks passed.");
