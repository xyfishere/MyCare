(function initHealthImportModule(global) {
  const namespace = global.MyCare || {};

  const HEALTH_METRICS = {
    sleep_minutes: { unit: "minutes", min: 0 },
    wake_time: { unit: "minutes-after-midnight", min: 0, max: 1439 },
    steps: { unit: "count", min: 0 },
    active_minutes: { unit: "minutes", min: 0 },
    active_energy: { unit: "kcal", min: 0 },
    heart_rate: { unit: "bpm", min: 1 },
    resting_heart_rate: { unit: "bpm", min: 1 },
    heart_rate_variability: { unit: "ms", min: 0 },
    temperature_delta: { unit: "celsius_delta", min: -20, max: 20 },
  };

  const METRIC_ALIASES = {
    sleep: "sleep_minutes",
    sleep_duration: "sleep_minutes",
    sleep_minutes: "sleep_minutes",
    wake: "wake_time",
    wake_time: "wake_time",
    wakeup: "wake_time",
    wake_up_time: "wake_time",
    steps: "steps",
    step_count: "steps",
    active: "active_minutes",
    active_minutes: "active_minutes",
    exercise_minutes: "active_minutes",
    active_calories: "active_energy",
    active_energy: "active_energy",
    calories: "active_energy",
    energy_burned: "active_energy",
    heart_rate: "heart_rate",
    hr: "heart_rate",
    resting_hr: "resting_heart_rate",
    resting_heart_rate: "resting_heart_rate",
    rhr: "resting_heart_rate",
    hrv: "heart_rate_variability",
    heart_rate_variability: "heart_rate_variability",
    temperature_delta: "temperature_delta",
    body_temperature_delta: "temperature_delta",
  };

  const SOURCE_ALIASES = {
    apple: "apple-health-export",
    apple_health: "apple-health-export",
    apple_health_export: "apple-health-export",
    apple_healthkit: "apple-health-export",
    csv: "manual-csv",
    google: "google-health",
    google_health: "google-health",
    google_fit: "google-health",
    health_connect: "health-connect",
    json: "manual-json",
    manual: "manual",
    manual_csv: "manual-csv",
    manual_json: "manual-json",
    fitbit: "fitbit",
  };

  function cleanText(value) {
    return String(value ?? "").trim();
  }

  function normalizeKey(value) {
    return cleanText(value).toLowerCase().replace(/[\s-]+/g, "_");
  }

  function normalizeDateText(value) {
    const text = cleanText(value).slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
  }

  function normalizeRecordedAt(value, dateText = "") {
    const text = cleanText(value);
    if (text) {
      const date = new Date(text);
      if (!Number.isNaN(date.getTime())) return date.toISOString();
    }
    const date = normalizeDateText(dateText);
    return date ? `${date}T00:00:00.000Z` : "";
  }

  function normalizeMetric(metric) {
    const key = normalizeKey(metric);
    const normalized = METRIC_ALIASES[key] || key;
    if (!HEALTH_METRICS[normalized]) throw new Error(`Unsupported health metric: ${metric}`);
    return normalized;
  }

  function normalizeSource(source) {
    const key = normalizeKey(source || "manual");
    return SOURCE_ALIASES[key] || key || "manual";
  }

  function minutesFromTimeText(value) {
    const match = cleanText(value).match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return hour * 60 + minute;
  }

  function timeTextFromMinutes(value) {
    if (!Number.isFinite(value)) return "";
    const total = Math.max(0, Math.min(1439, Math.round(value)));
    const hour = Math.floor(total / 60);
    const minute = total % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  function normalizeValue(metric, value) {
    const normalizedMetric = normalizeMetric(metric);
    const config = HEALTH_METRICS[normalizedMetric];
    const candidate = normalizedMetric === "wake_time" && typeof value === "string"
      ? minutesFromTimeText(value)
      : Number(value);
    if (!Number.isFinite(candidate)) throw new Error(`Invalid value for ${normalizedMetric}`);
    if (Number.isFinite(config.min) && candidate < config.min) throw new Error(`Value for ${normalizedMetric} is below the allowed range`);
    if (Number.isFinite(config.max) && candidate > config.max) throw new Error(`Value for ${normalizedMetric} is above the allowed range`);
    return normalizedMetric === "wake_time" ? Math.round(candidate) : candidate;
  }

  function normalizeMetadata(value) {
    if (!value) return {};
    if (typeof value === "object" && !Array.isArray(value)) return { ...value };
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
      } catch {
        return {};
      }
    }
    return {};
  }

  function dateFromInput(input = {}) {
    const direct = normalizeDateText(input.date || input.record_date || input.recordDate);
    if (direct) return direct;
    const recordedAt = normalizeRecordedAt(input.recorded_at || input.recordedAt || input.start || input.start_at || input.startAt);
    return normalizeDateText(recordedAt);
  }

  function buildRecordId(record) {
    const sourceRecordId = cleanText(record.sourceRecordId);
    const base = sourceRecordId || `${record.source}:${record.metric}:${record.date}:${record.recordedAt}:${record.value}`;
    return base.toLowerCase().replace(/[^a-z0-9:_-]+/g, "-").replace(/-+/g, "-").slice(0, 160);
  }

  function normalizeHealthRecord(input = {}, options = {}) {
    const metric = normalizeMetric(input.metric || input.type || input.name);
    const date = dateFromInput(input);
    if (!date) throw new Error("A valid health record date is required");
    const recordedAt = normalizeRecordedAt(input.recorded_at || input.recordedAt || input.start || input.start_at || input.startAt, date);
    const source = normalizeSource(input.source || options.source);
    const value = normalizeValue(metric, input.value ?? input.amount ?? input.duration ?? input.minutes);
    const unit = cleanText(input.unit) || HEALTH_METRICS[metric].unit;
    const record = {
      id: cleanText(input.id),
      ownerId: cleanText(input.owner_id || input.ownerId || options.ownerId),
      source,
      sourceRecordId: cleanText(input.source_record_id || input.sourceRecordId),
      metric,
      recordedAt,
      date,
      value,
      unit,
      metadata: normalizeMetadata(input.metadata || input.metadata_json || input.metadataJson),
      createdAt: normalizeRecordedAt(input.created_at || input.createdAt) || "",
      updatedAt: normalizeRecordedAt(input.updated_at || input.updatedAt) || "",
    };
    if (!record.id) record.id = buildRecordId(record);
    return record;
  }

  function mapHealthRecordRow(row = {}) {
    return normalizeHealthRecord({
      id: row.id,
      ownerId: row.owner_id || row.ownerId,
      source: row.source,
      sourceRecordId: row.source_record_id || row.sourceRecordId,
      metric: row.metric,
      recordedAt: row.recorded_at || row.recordedAt,
      date: row.date,
      value: row.value,
      unit: row.unit,
      metadata: row.metadata,
      createdAt: row.created_at || row.createdAt,
      updatedAt: row.updated_at || row.updatedAt,
    });
  }

  function toHealthRecordRow(record = {}, user) {
    const normalized = normalizeHealthRecord(record, { ownerId: typeof user === "string" ? user : user?.id });
    if (!normalized.ownerId) throw new Error("Signed-in user is required for cloud health records");
    return {
      id: normalized.id,
      owner_id: normalized.ownerId,
      source: normalized.source,
      source_record_id: normalized.sourceRecordId || null,
      metric: normalized.metric,
      recorded_at: normalized.recordedAt,
      date: normalized.date,
      value: normalized.value,
      unit: normalized.unit,
      metadata: normalized.metadata,
    };
  }

  function parseHealthJson(text, options = {}) {
    const parsed = typeof text === "string" ? JSON.parse(text) : text;
    const records = Array.isArray(parsed) ? parsed : parsed?.records || parsed?.data || [];
    if (!Array.isArray(records)) throw new Error("Health JSON import must be an array or contain a records array");
    return records.map((item) => normalizeHealthRecord(item, { ...options, source: options.source || "manual-json" }));
  }

  function parseCsvLine(line) {
    const values = [];
    let current = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      const next = line[index + 1];
      if (char === "\"" && quoted && next === "\"") {
        current += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);
    return values.map((value) => value.trim());
  }

  function parseHealthCsv(text, options = {}) {
    const lines = cleanText(text).split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = parseCsvLine(lines[0]).map(normalizeKey);
    const hasMetric = headers.some((header) => ["metric", "type", "name"].includes(header));
    const hasDate = headers.some((header) => ["date", "record_date", "recorddate", "recorded_at", "recordedat", "start", "start_at", "startat"].includes(header));
    const hasValue = headers.some((header) => ["value", "amount", "duration", "minutes"].includes(header));
    if (!hasMetric || !hasDate || !hasValue) {
      throw new Error("CSV import needs date, metric, and value columns");
    }
    return lines.slice(1).map((line) => {
      const values = parseCsvLine(line);
      const row = headers.reduce((acc, header, index) => {
        acc[header] = values[index] ?? "";
        return acc;
      }, {});
      return normalizeHealthRecord(row, { ...options, source: options.source || row.source || "manual-csv" });
    });
  }

  function decodeXmlText(value) {
    return cleanText(value)
      .replace(/&quot;/g, "\"")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  function parseXmlAttributes(text) {
    const attrs = {};
    const attrPattern = /([A-Za-z_:][\w:.-]*)="([^"]*)"/g;
    let match = attrPattern.exec(text);
    while (match) {
      attrs[match[1]] = decodeXmlText(match[2]);
      match = attrPattern.exec(text);
    }
    return attrs;
  }

  function appleDateToIso(value) {
    const text = cleanText(value);
    const match = text.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/);
    const normalized = match ? `${match[1]}T${match[2]}${match[3]}:${match[4]}` : text;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }

  function minutesBetween(startText, endText) {
    const start = new Date(appleDateToIso(startText));
    const end = new Date(appleDateToIso(endText));
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return null;
    return Math.round((end - start) / 60000);
  }

  function isAppleSleepValue(value) {
    const text = cleanText(value);
    return /SleepAnalysisAsleep/.test(text) && !/InBed|Awake/.test(text);
  }

  function appleMetricFromType(type) {
    if (/StepCount$/.test(type)) return "steps";
    if (/AppleExerciseTime$/.test(type)) return "active_minutes";
    if (/ActiveEnergyBurned$/.test(type)) return "active_energy";
    if (/HeartRate$/.test(type) && !/RestingHeartRate$/.test(type)) return "heart_rate";
    if (/RestingHeartRate$/.test(type)) return "resting_heart_rate";
    if (/HeartRateVariabilitySDNN$/.test(type)) return "heart_rate_variability";
    return "";
  }

  function buildAppleSourceRecordId(attrs, metric) {
    return [
      "apple",
      metric,
      attrs.type,
      attrs.startDate,
      attrs.endDate,
      attrs.value,
      attrs.sourceName,
    ].filter(Boolean).join(":");
  }

  function normalizeAppleRecord(attrs, metric, value) {
    const endIso = appleDateToIso(attrs.endDate || attrs.startDate || attrs.creationDate);
    const startIso = appleDateToIso(attrs.startDate || attrs.endDate || attrs.creationDate);
    const date = normalizeDateText(endIso || startIso);
    return normalizeHealthRecord({
      source: "apple_health_export",
      sourceRecordId: buildAppleSourceRecordId(attrs, metric),
      metric,
      date,
      value,
      unit: attrs.unit || HEALTH_METRICS[metric].unit,
      recordedAt: endIso || startIso,
      metadata: {
        appleType: attrs.type || "",
        sourceName: attrs.sourceName || "",
      },
    });
  }

  function parseAppleHealthXml(text) {
    const records = [];
    const recordPattern = /<Record\b[^>]*\/?>/g;
    const matches = cleanText(text).match(recordPattern) || [];
    matches.forEach((recordText) => {
      const attrs = parseXmlAttributes(recordText);
      const type = attrs.type || "";
      try {
        if (/HKCategoryTypeIdentifierSleepAnalysis$/.test(type)) {
          if (!isAppleSleepValue(attrs.value)) return;
          const minutes = minutesBetween(attrs.startDate, attrs.endDate);
          if (!minutes) return;
          records.push(normalizeAppleRecord(attrs, "sleep_minutes", minutes));
          return;
        }
        const metric = appleMetricFromType(type);
        if (!metric) return;
        records.push(normalizeAppleRecord(attrs, metric, attrs.value));
      } catch {
        // Apple Health exports can contain many unsupported or malformed rows; skip only the row.
      }
    });
    return records;
  }

  function looksLikeZip(text) {
    return cleanText(text).startsWith("PK");
  }

  function looksLikeJson(text) {
    const trimmed = cleanText(text);
    return trimmed.startsWith("{") || trimmed.startsWith("[");
  }

  function looksLikeXml(text) {
    const trimmed = cleanText(text);
    return trimmed.startsWith("<?xml") || trimmed.startsWith("<HealthData") || trimmed.includes("<HealthData");
  }

  function looksLikeCsv(text) {
    const firstLine = cleanText(text).split(/\r?\n/)[0] || "";
    const headers = parseCsvLine(firstLine).map(normalizeKey);
    return headers.includes("metric") || headers.includes("type") || headers.includes("name");
  }

  function parseHealthFileText(text, filename = "", options = {}) {
    const name = cleanText(filename).toLowerCase();
    if (name.endsWith(".zip") || looksLikeZip(text)) {
      throw new Error("Apple Health exports come as a zip. Please unzip it and upload apple_health_export/export.xml");
    }
    if (name.endsWith(".xml") || looksLikeXml(text)) {
      return parseAppleHealthXml(text, options);
    }
    if (name.endsWith(".json") || looksLikeJson(text)) {
      return parseHealthJson(text, options);
    }
    if (name.endsWith(".csv") || looksLikeCsv(text)) {
      return parseHealthCsv(text, options);
    }
    throw new Error("Unsupported file. Upload CSV, JSON, or the Apple Health export.xml file");
  }

  function filterRecords(records = [], options = {}) {
    const start = normalizeDateText(options.periodStart || options.start);
    const end = normalizeDateText(options.periodEnd || options.end);
    const metrics = options.metrics?.length ? new Set(options.metrics.map(normalizeMetric)) : null;
    return records
      .map((record) => normalizeHealthRecord(record))
      .filter((record) => (!start || record.date >= start) && (!end || record.date <= end))
      .filter((record) => !metrics || metrics.has(record.metric));
  }

  function average(values = []) {
    const nums = values.filter(Number.isFinite);
    return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : null;
  }

  function trendFromValues(values = []) {
    const nums = values.filter(Number.isFinite);
    if (nums.length < 2) return "unknown";
    const first = nums[0];
    const last = nums[nums.length - 1];
    const delta = last - first;
    if (Math.abs(delta) < Math.max(1, Math.abs(first) * 0.03)) return "stable";
    return delta > 0 ? "up" : "down";
  }

  function valuesFor(records, metric) {
    return records
      .filter((record) => record.metric === metric)
      .sort((a, b) => `${a.date}${a.recordedAt}`.localeCompare(`${b.date}${b.recordedAt}`))
      .map((record) => record.value);
  }

  function buildHealthSummary(records = [], options = {}) {
    const filtered = filterRecords(records, options);
    const sleepValues = valuesFor(filtered, "sleep_minutes");
    const wakeValues = valuesFor(filtered, "wake_time");
    const stepValues = valuesFor(filtered, "steps");
    const activeValues = valuesFor(filtered, "active_minutes");
    const activeEnergyValues = valuesFor(filtered, "active_energy");
    const heartRateValues = valuesFor(filtered, "heart_rate");
    const restingHeartRateValues = valuesFor(filtered, "resting_heart_rate");
    const hrvValues = valuesFor(filtered, "heart_rate_variability");
    return {
      recordCount: filtered.length,
      periodStart: normalizeDateText(options.periodStart || options.start),
      periodEnd: normalizeDateText(options.periodEnd || options.end),
      sleep: {
        records: sleepValues.length,
        averageMinutes: average(sleepValues),
        trend: trendFromValues(sleepValues),
      },
      wake: {
        records: wakeValues.length,
        averageTime: timeTextFromMinutes(average(wakeValues)),
        trend: trendFromValues(wakeValues),
      },
      activity: {
        stepsTotal: stepValues.reduce((sum, value) => sum + value, 0),
        activeMinutesTotal: activeValues.reduce((sum, value) => sum + value, 0),
        activeEnergyTotal: activeEnergyValues.reduce((sum, value) => sum + value, 0),
        stepsTrend: trendFromValues(stepValues),
        activeEnergyTrend: trendFromValues(activeEnergyValues),
      },
      recovery: {
        heartRateAverage: average(heartRateValues),
        heartRateTrend: trendFromValues(heartRateValues),
        restingHeartRateAverage: average(restingHeartRateValues),
        heartRateVariabilityAverage: average(hrvValues),
        restingHeartRateTrend: trendFromValues(restingHeartRateValues),
      },
    };
  }

  namespace.healthImport = {
    HEALTH_METRICS,
    buildHealthSummary,
    filterRecords,
    mapHealthRecordRow,
    minutesFromTimeText,
    normalizeDateText,
    normalizeHealthRecord,
    normalizeMetric,
    normalizeSource,
    normalizeValue,
    parseAppleHealthXml,
    parseHealthFileText,
    parseHealthCsv,
    parseHealthJson,
    timeTextFromMinutes,
    toHealthRecordRow,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.healthImport;
  }
})(typeof window !== "undefined" ? window : globalThis);
