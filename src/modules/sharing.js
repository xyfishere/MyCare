(function initSharingModule(global) {
  const namespace = global.MyCare || {};
  const SUMMARY_TYPES = ["skin", "sleep", "focus", "goals"];

  function requireClient(client) {
    if (!client?.from) throw new Error("Supabase client is required");
  }

  function getUserId(user) {
    return typeof user === "string" ? user : user?.id;
  }

  function requireUser(user) {
    const userId = getUserId(user);
    if (!userId) throw new Error("Signed-in user is required");
    return userId;
  }

  function ensureFamilyId(familyId) {
    const value = String(familyId || "").trim();
    if (!value) throw new Error("Family id is required");
    return value;
  }

  function normalizeSummaryType(type) {
    const value = String(type || "").trim().toLowerCase();
    if (!SUMMARY_TYPES.includes(value)) throw new Error(`Unsupported shared stats type: ${type}`);
    return value;
  }

  function normalizeDateText(value, fallback = "") {
    const text = String(value || fallback || "").slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
  }

  function throwIfError(result) {
    if (result?.error) throw result.error;
    return result?.data;
  }

  function mapSharedStat(row = {}) {
    return {
      id: row.id,
      familyId: row.family_id || row.familyId,
      ownerId: row.owner_id || row.ownerId,
      periodStart: row.period_start || row.periodStart,
      periodEnd: row.period_end || row.periodEnd,
      summaryType: row.summary_type || row.summaryType,
      payload: row.payload || {},
      visible: row.visible !== false,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    };
  }

  function dateInRange(dateText, periodStart, periodEnd) {
    const date = normalizeDateText(dateText);
    return Boolean(date && date >= periodStart && date <= periodEnd);
  }

  function countBy(items, getKey) {
    return items.reduce((acc, item) => {
      const key = String(getKey(item) || "").trim();
      if (!key) return acc;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }

  function topCount(counts = {}) {
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
  }

  function minutesFromTimeText(timeText) {
    const match = String(timeText || "").match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return hour * 60 + minute;
  }

  function timeTextFromMinutes(totalMinutes) {
    if (!Number.isFinite(totalMinutes)) return "";
    const rounded = Math.round(totalMinutes);
    const hour = Math.floor(rounded / 60) % 24;
    const minute = rounded % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  function buildSkinSummary(state = {}, periodStart, periodEnd) {
    const records = (state.morningEntries || [])
      .filter((entry) => dateInRange(entry.date, periodStart, periodEnd) && entry.skinState);
    const counts = countBy(records, (entry) => entry.skinState);
    return {
      totalDays: records.length,
      topStatus: topCount(counts),
      counts,
    };
  }

  function buildSleepSummary(state = {}, periodStart, periodEnd) {
    const wakeMinutes = (state.morningEntries || [])
      .filter((entry) => dateInRange(entry.date, periodStart, periodEnd))
      .map((entry) => minutesFromTimeText(entry.wakeTime))
      .filter(Number.isFinite);
    const averageWakeMinutes = wakeMinutes.length
      ? wakeMinutes.reduce((sum, value) => sum + value, 0) / wakeMinutes.length
      : null;
    return {
      recordCount: wakeMinutes.length,
      averageWakeTime: averageWakeMinutes === null ? "" : timeTextFromMinutes(averageWakeMinutes),
    };
  }

  function buildFocusSummary(state = {}, periodStart, periodEnd) {
    const sessions = (state.focusSessions || [])
      .filter((entry) => dateInRange(entry.date, periodStart, periodEnd));
    const minutes = sessions.reduce((sum, entry) => sum + Number(entry.minutes || 0), 0);
    const categoryMinutes = sessions.reduce((acc, entry) => {
      const category = String(entry.category || "uncategorized").trim() || "uncategorized";
      acc[category] = (acc[category] || 0) + Number(entry.minutes || 0);
      return acc;
    }, {});
    const habitSeedMinutes = sessions.reduce((acc, entry) => {
      const seed = String(entry.habitSeed || "").trim();
      if (!seed) return acc;
      acc[seed] = (acc[seed] || 0) + Number(entry.minutes || 0);
      return acc;
    }, {});
    return {
      minutes,
      sessions: sessions.length,
      topCategory: topCount(categoryMinutes),
      topHabitSeed: topCount(habitSeedMinutes),
    };
  }

  function buildGoalSummary(state = {}, periodStart, periodEnd) {
    const goals = state.workGoals || [];
    const completed = goals.filter((goal) => goal.status === "done" && dateInRange(goal.completedAt, periodStart, periodEnd));
    return {
      completed: completed.length,
      open: goals.filter((goal) => goal.status !== "done").length,
    };
  }

  function buildSummaryPayload(type, state, periodStart, periodEnd) {
    const summaryType = normalizeSummaryType(type);
    if (summaryType === "skin") return buildSkinSummary(state, periodStart, periodEnd);
    if (summaryType === "sleep") return buildSleepSummary(state, periodStart, periodEnd);
    if (summaryType === "focus") return buildFocusSummary(state, periodStart, periodEnd);
    if (summaryType === "goals") return buildGoalSummary(state, periodStart, periodEnd);
    return {};
  }

  function buildPersonalStatsSnapshots(state = {}, options = {}) {
    const periodStart = normalizeDateText(options.periodStart);
    const periodEnd = normalizeDateText(options.periodEnd);
    if (!periodStart || !periodEnd) throw new Error("A valid sharing period is required");
    if (periodEnd < periodStart) throw new Error("Sharing period end must be after start");
    const types = (options.summaryTypes || ["skin", "focus", "goals"])
      .map(normalizeSummaryType);
    return types.map((summaryType) => ({
      familyId: options.familyId || "",
      periodStart,
      periodEnd,
      summaryType,
      payload: buildSummaryPayload(summaryType, state, periodStart, periodEnd),
      visible: options.visible !== false,
    }));
  }

  function toSharedStatUpsert(input = {}, user) {
    const periodStart = normalizeDateText(input.periodStart || input.period_start);
    const periodEnd = normalizeDateText(input.periodEnd || input.period_end);
    if (!periodStart || !periodEnd) throw new Error("A valid sharing period is required");
    if (periodEnd < periodStart) throw new Error("Sharing period end must be after start");
    return {
      family_id: ensureFamilyId(input.familyId || input.family_id),
      owner_id: requireUser(user),
      period_start: periodStart,
      period_end: periodEnd,
      summary_type: normalizeSummaryType(input.summaryType || input.summary_type),
      payload: input.payload && typeof input.payload === "object" ? input.payload : {},
      visible: input.visible !== false,
    };
  }

  async function listSharedStats(client, familyId, options = {}) {
    requireClient(client);
    let query = client
      .from("family_shared_stats")
      .select("id, family_id, owner_id, period_start, period_end, summary_type, payload, visible, created_at, updated_at")
      .eq("family_id", ensureFamilyId(familyId))
      .order("period_end", { ascending: false });
    if (options.visibleOnly !== false) query = query.eq("visible", true);
    if (options.periodStart) query = query.gte("period_end", normalizeDateText(options.periodStart));
    if (options.periodEnd) query = query.lte("period_start", normalizeDateText(options.periodEnd));
    if (options.summaryTypes?.length) query = query.in("summary_type", options.summaryTypes.map(normalizeSummaryType));
    const data = throwIfError(await query);
    return (data || []).map(mapSharedStat);
  }

  async function saveSharedStats(client, user, snapshots = []) {
    requireClient(client);
    const list = Array.isArray(snapshots) ? snapshots : [snapshots];
    const rows = list.map((snapshot) => toSharedStatUpsert(snapshot, user));
    if (!rows.length) return [];
    const data = throwIfError(await client
      .from("family_shared_stats")
      .upsert(rows, { onConflict: "family_id,owner_id,period_start,period_end,summary_type" })
      .select("id, family_id, owner_id, period_start, period_end, summary_type, payload, visible, created_at, updated_at"));
    return (data || []).map(mapSharedStat);
  }

  async function setSharedStatVisibility(client, user, statId, visible) {
    requireClient(client);
    requireUser(user);
    const data = throwIfError(await client
      .from("family_shared_stats")
      .update({ visible: visible !== false })
      .eq("id", statId)
      .select("id, family_id, owner_id, period_start, period_end, summary_type, payload, visible, created_at, updated_at")
      .single());
    return mapSharedStat(data);
  }

  async function deleteSharedStat(client, user, statId) {
    requireClient(client);
    requireUser(user);
    return throwIfError(await client
      .from("family_shared_stats")
      .delete()
      .eq("id", statId));
  }

  namespace.sharing = {
    SUMMARY_TYPES,
    buildFocusSummary,
    buildGoalSummary,
    buildPersonalStatsSnapshots,
    buildSkinSummary,
    buildSleepSummary,
    buildSummaryPayload,
    deleteSharedStat,
    listSharedStats,
    mapSharedStat,
    normalizeSummaryType,
    saveSharedStats,
    setSharedStatVisibility,
    toSharedStatUpsert,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.sharing;
  }
})(typeof window !== "undefined" ? window : globalThis);
