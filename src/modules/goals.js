(function initGoalsModule(global) {
  const namespace = global.MyCare || {};
  const MS_PER_DAY = 86400000;

  function toLocalDate(dateText) {
    if (!dateText) return null;
    const date = new Date(`${dateText}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function daysBetween(fromDateText, toDateText) {
    const from = toLocalDate(fromDateText);
    const to = toLocalDate(toDateText);
    if (!from || !to) return null;
    return Math.round((to - from) / MS_PER_DAY);
  }

  function getDaysUntilDue(goal, todayDateText) {
    if (!goal?.deadline) return null;
    return daysBetween(todayDateText, goal.deadline);
  }

  function getDeadlineClass(goal, todayDateText) {
    if (goal?.status === "done") return "done";
    const days = getDaysUntilDue(goal, todayDateText);
    if (days === null) return "";
    if (days < 0) return "overdue";
    if (days <= 7) return "soon";
    return "";
  }

  function getDeadlineState(goal, todayDateText) {
    const days = getDaysUntilDue(goal, todayDateText);
    return {
      days,
      className: getDeadlineClass(goal, todayDateText),
      isDone: goal?.status === "done",
      isOverdue: days !== null && days < 0,
      isDueToday: days === 0,
      isDueSoon: days !== null && days >= 0 && days <= 7,
    };
  }

  function sortGoals(goals = []) {
    return [...goals].sort((a, b) => {
      if (a.status !== b.status) return a.status === "open" ? -1 : 1;
      return String(a.deadline || "").localeCompare(String(b.deadline || ""));
    });
  }

  function getVisibleGoals(goals = [], filter = "current") {
    const sorted = sortGoals(goals);
    return sorted.filter((goal) => filter === "finished"
      ? goal.status === "done"
      : goal.status !== "done");
  }

  function buildGoalStats(goals = [], options = {}) {
    const {
      days = [],
      range = "7",
      todayDateText,
      uncategorizedLabel = "Uncategorized",
    } = options;
    const completedInRange = goals.filter((goal) => goal.status === "done" && days.includes(goal.completedAt?.slice(0, 10)));
    const openGoals = goals.filter((goal) => goal.status !== "done");
    const relevantGoals = range === "all"
      ? goals
      : [...openGoals, ...completedInRange.filter((goal) => !openGoals.includes(goal))];
    const overdue = openGoals.filter((goal) => {
      const due = getDaysUntilDue(goal, todayDateText);
      return due !== null && due < 0;
    });
    const dueSoon = openGoals.filter((goal) => {
      const due = getDaysUntilDue(goal, todayDateText);
      return due !== null && due >= 0 && due <= 7;
    });
    const inProgress = openGoals.filter((goal) => !overdue.includes(goal) && !dueSoon.includes(goal));
    const leadDays = completedInRange
      .filter((goal) => goal.deadline && goal.completedAt)
      .map((goal) => daysBetween(goal.completedAt.slice(0, 10), goal.deadline))
      .filter(Number.isFinite);
    const averageLead = leadDays.length
      ? Math.round(leadDays.reduce((sum, value) => sum + value, 0) / leadDays.length)
      : null;
    const categoryTotals = relevantGoals.reduce((acc, goal) => {
      const category = goal.category?.trim() || uncategorizedLabel;
      acc[category] = acc[category] || { total: 0, completed: 0 };
      acc[category].total += 1;
      if (goal.status === "done") acc[category].completed += 1;
      return acc;
    }, {});
    const futureGoals = openGoals
      .map((goal) => ({ goal, days: getDaysUntilDue(goal, todayDateText) }))
      .filter((item) => item.days !== null && item.days >= 0)
      .sort((a, b) => String(a.goal.deadline).localeCompare(String(b.goal.deadline)));

    return {
      averageLead,
      categoryTotals,
      completedInRange,
      dueSoon,
      futureGoals,
      inProgress,
      openGoals,
      overdue,
      relevantGoals,
    };
  }

  namespace.goals = {
    buildGoalStats,
    daysBetween,
    getDaysUntilDue,
    getDeadlineClass,
    getDeadlineState,
    getVisibleGoals,
    sortGoals,
    toLocalDate,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.goals;
  }
})(typeof window !== "undefined" ? window : globalThis);
