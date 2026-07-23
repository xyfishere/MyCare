const fs = require("fs");
const healthImport = require("../src/modules/health-import.js");
const healthReport = require("../src/modules/health-report.js");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const text = fs.readFileSync("samples/apple-watch-realistic-14days.csv", "utf8");
const records = healthImport.parseHealthFileText(text, "samples/apple-watch-realistic-14days.csv");
const summary = healthImport.buildHealthSummary(records, {
  periodStart: "2026-07-01",
  periodEnd: "2026-07-14",
});

const en = healthReport.buildHealthReport(records, summary, { language: "en" });
assert(en.coverage.includes("14 days"), "English report should include coverage");
assert(en.signals.length >= 3, "English report should include useful signals");
assert(en.headline.includes("body") || en.headline.includes("Slower"), "English report should sound human and body-aware");
assert(en.note.includes("not a score"), "English report should avoid score-like framing");
assert(en.note.includes("not medical guidance"), "English report should avoid diagnostic framing");

const zh = healthReport.buildHealthReport(records, summary, { language: "zh" });
assert(zh.coverage.includes("14 天"), "Chinese report should include coverage");
assert(zh.signals.length >= 3, "Chinese report should include useful signals");
assert(zh.headline.includes("身体"), "Chinese report should sound human and body-aware");
assert(zh.note.includes("不是分数"), "Chinese report should avoid score-like framing");
assert(zh.note.includes("不是医疗判断"), "Chinese report should avoid diagnostic framing");

const empty = healthReport.buildHealthReport([], {}, { language: "en" });
assert(empty.signals.length === 0, "empty report should not invent signals");
assert(empty.headline.includes("wearable data"), "empty report should ask for imported data");
assert(empty.note.includes("does not score you"), "empty report should keep the My Care tone");

const forbidden = /diagnos|disease|illness|treatment|medical advice|病|诊断|治疗/i;
assert(!forbidden.test(JSON.stringify(en.signals)), "signals should stay non-diagnostic");

console.log("Health report checks passed.");
