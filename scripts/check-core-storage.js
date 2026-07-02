const storage = require("../src/core/storage.js");

const memory = new Map();
globalThis.localStorage = {
  getItem: (key) => memory.get(key) || null,
  setItem: (key, value) => memory.set(key, value),
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const original = { settings: { language: "zh" }, records: [{ id: 1 }] };
const copy = storage.clone(original);
copy.settings.language = "en";
copy.records[0].id = 2;
assert(original.settings.language === "zh", "clone should not mutate nested settings");
assert(original.records[0].id === 1, "clone should not mutate nested arrays");

storage.writeJson("state", { ok: true, nested: { count: 1 } });
assert(storage.readJson("state").nested.count === 1, "readJson should return written data");
assert(storage.readJson("missing", { ok: false }).ok === false, "readJson should use fallback for missing keys");

memory.set("broken", "{not json");
assert(storage.readJson("broken", { safe: true }).safe === true, "readJson should use fallback for invalid JSON");

const merged = storage.mergeState(
  { settings: { language: "zh", calendarUrl: "default" }, workGoals: [] },
  { settings: { language: "en" }, workGoals: [{ id: "goal-1" }] },
);
assert(merged.settings.language === "en", "mergeState should keep saved settings");
assert(merged.settings.calendarUrl === "default", "mergeState should preserve default settings");
assert(merged.workGoals.length === 1, "mergeState should keep saved records");

console.log("Core storage checks passed.");
