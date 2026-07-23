const healthImport = require("../src/modules/health-import.js");
const fs = require("fs");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const jsonRecords = healthImport.parseHealthJson({
  records: [
    {
      source: "google_health",
      sourceRecordId: "sleep-1",
      metric: "sleep",
      date: "2026-07-01",
      value: 420,
      metadata: { start: "2026-06-30T23:30:00-06:00", end: "2026-07-01T06:30:00-06:00", privateStageRows: [1, 2, 3] },
    },
    {
      source: "google_health",
      sourceRecordId: "wake-1",
      metric: "wake",
      date: "2026-07-01",
      value: "06:30",
    },
    {
      source: "google_health",
      sourceRecordId: "steps-1",
      metric: "steps",
      date: "2026-07-01",
      value: 8300,
    },
    {
      source: "google_health",
      sourceRecordId: "heart-1",
      metric: "heart_rate",
      date: "2026-07-01",
      value: 76,
    },
    {
      source: "google_health",
      sourceRecordId: "energy-1",
      metric: "active_energy",
      date: "2026-07-01",
      value: 320,
    },
  ],
});

assert(jsonRecords.length === 5, "JSON import should normalize all records");
assert(jsonRecords[0].source === "google-health", "source alias should normalize");
assert(jsonRecords[0].metric === "sleep_minutes", "sleep alias should normalize");
assert(jsonRecords[1].metric === "wake_time", "wake alias should normalize");
assert(jsonRecords[1].value === 390, "wake time should convert to minutes after midnight");
assert(jsonRecords[2].unit === "count", "steps should use count units by default");
assert(jsonRecords[3].metric === "heart_rate", "heart rate should normalize");
assert(jsonRecords[4].metric === "active_energy", "active energy should normalize");

const csvRecords = healthImport.parseHealthCsv(`source,metric,date,value,unit,metadata_json
apple_health_export,sleep_duration,2026-07-02,450,minutes,"{""start"":""2026-07-01T23:20:00-06:00""}"
manual_csv,active_minutes,2026-07-02,35,minutes,
manual_csv,calories,2026-07-02,420,kcal,
manual_csv,hr,2026-07-02,79,bpm,
manual_csv,resting_hr,2026-07-02,62,bpm,
`);

assert(csvRecords.length === 5, "CSV import should normalize rows");
assert(csvRecords[0].source === "apple-health-export", "Apple source alias should normalize");
assert(csvRecords[0].metric === "sleep_minutes", "CSV metric alias should normalize");
assert(csvRecords[1].metric === "active_minutes", "active minutes should normalize");
assert(csvRecords[2].metric === "active_energy", "active energy alias should normalize");
assert(csvRecords[3].metric === "heart_rate", "heart rate alias should normalize");
assert(csvRecords[4].metric === "resting_heart_rate", "resting HR should normalize");

const appleRecords = healthImport.parseAppleHealthXml(`<?xml version="1.0" encoding="UTF-8"?>
<HealthData>
  <Record type="HKQuantityTypeIdentifierStepCount" sourceName="Abigail Apple Watch" unit="count" creationDate="2026-07-03 09:00:00 -0600" startDate="2026-07-03 08:00:00 -0600" endDate="2026-07-03 09:00:00 -0600" value="1200"/>
  <Record type="HKQuantityTypeIdentifierAppleExerciseTime" sourceName="Abigail Apple Watch" unit="min" creationDate="2026-07-03 19:00:00 -0600" startDate="2026-07-03 18:30:00 -0600" endDate="2026-07-03 19:00:00 -0600" value="30"/>
  <Record type="HKQuantityTypeIdentifierActiveEnergyBurned" sourceName="Abigail Apple Watch" unit="kcal" creationDate="2026-07-03 19:00:00 -0600" startDate="2026-07-03 18:30:00 -0600" endDate="2026-07-03 19:00:00 -0600" value="275"/>
  <Record type="HKQuantityTypeIdentifierHeartRate" sourceName="Abigail Apple Watch" unit="count/min" creationDate="2026-07-03 19:00:00 -0600" startDate="2026-07-03 18:30:00 -0600" endDate="2026-07-03 19:00:00 -0600" value="84"/>
  <Record type="HKQuantityTypeIdentifierRestingHeartRate" sourceName="Abigail Apple Watch" unit="count/min" creationDate="2026-07-03 08:00:00 -0600" startDate="2026-07-03 08:00:00 -0600" endDate="2026-07-03 08:00:00 -0600" value="61"/>
  <Record type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" sourceName="Abigail Apple Watch" unit="ms" creationDate="2026-07-03 08:00:00 -0600" startDate="2026-07-03 08:00:00 -0600" endDate="2026-07-03 08:00:00 -0600" value="42"/>
  <Record type="HKCategoryTypeIdentifierSleepAnalysis" sourceName="Abigail Apple Watch" creationDate="2026-07-04 07:00:00 -0600" startDate="2026-07-03 23:30:00 -0600" endDate="2026-07-04 06:30:00 -0600" value="HKCategoryValueSleepAnalysisAsleepCore"/>
  <Record type="HKCategoryTypeIdentifierSleepAnalysis" sourceName="Abigail Apple Watch" creationDate="2026-07-04 07:00:00 -0600" startDate="2026-07-03 22:30:00 -0600" endDate="2026-07-03 23:00:00 -0600" value="HKCategoryValueSleepAnalysisInBed"/>
</HealthData>`);

assert(appleRecords.length === 7, "Apple Health XML import should keep supported records and skip InBed rows");
assert(appleRecords[0].source === "apple-health-export", "Apple XML source should normalize");
assert(appleRecords.some((record) => record.metric === "steps" && record.value === 1200), "Apple steps should import");
assert(appleRecords.some((record) => record.metric === "active_minutes" && record.value === 30), "Apple exercise minutes should import");
assert(appleRecords.some((record) => record.metric === "active_energy" && record.value === 275), "Apple active energy should import");
assert(appleRecords.some((record) => record.metric === "heart_rate" && record.value === 84), "Apple heart rate should import");
assert(appleRecords.some((record) => record.metric === "resting_heart_rate" && record.value === 61), "Apple resting heart rate should import");
assert(appleRecords.some((record) => record.metric === "heart_rate_variability" && record.value === 42), "Apple HRV should import");
assert(appleRecords.some((record) => record.metric === "sleep_minutes" && record.value === 420 && record.date === "2026-07-04"), "Apple sleep should import as end-date duration");

const sniffedXmlRecords = healthImport.parseHealthFileText(`<?xml version="1.0" encoding="UTF-8"?>
<HealthData>
  <Record type="HKQuantityTypeIdentifierStepCount" sourceName="Abigail Apple Watch" unit="count" creationDate="2026-07-05 09:00:00 -0600" startDate="2026-07-05 08:00:00 -0600" endDate="2026-07-05 09:00:00 -0600" value="500"/>
</HealthData>`, "not-an-xml-name.txt");

assert(sniffedXmlRecords.length === 1, "file sniffer should detect Apple XML by content");
assert(sniffedXmlRecords[0].metric === "steps", "sniffed Apple XML should parse supported metrics");

const sniffedCsvRecords = healthImport.parseHealthFileText(`date,metric,value,unit
2026-07-05,steps,700,count
`, "watch-data.txt");

assert(sniffedCsvRecords.length === 1, "file sniffer should detect CSV by headers");
assert(sniffedCsvRecords[0].metric === "steps", "sniffed CSV should parse supported metrics");

const realisticSamples = [
  ["samples/apple-watch-realistic-14days.csv", 98],
  ["samples/apple-watch-realistic-14days.json", 35],
  ["samples/apple-health-realistic-export-sample.xml", 49],
];

realisticSamples.forEach(([file, expectedCount]) => {
  const text = fs.readFileSync(file, "utf8");
  const records = healthImport.parseHealthFileText(text, file);
  const summary = healthImport.buildHealthSummary(records, {
    periodStart: "2026-07-01",
    periodEnd: "2026-07-14",
  });
  assert(records.length === expectedCount, `${file} should parse expected sample records`);
  assert(summary.sleep.records > 0, `${file} should include sleep records`);
  assert(summary.activity.stepsTotal > 0, `${file} should include steps`);
  assert(summary.activity.activeEnergyTotal > 0, `${file} should include active energy`);
  assert(summary.recovery.heartRateAverage > 0, `${file} should include heart rate`);
  assert(summary.recovery.restingHeartRateAverage > 0, `${file} should include recovery signals`);
});

let rejectedZip = false;
try {
  healthImport.parseHealthFileText("PK\u0003\u0004 fake zip content", "export.zip");
} catch (error) {
  rejectedZip = /unzip/i.test(error.message);
}
assert(rejectedZip, "zip upload should explain that export.xml is required");

let rejectedBadCsv = false;
try {
  healthImport.parseHealthCsv(`foo,bar
1,2`);
} catch (error) {
  rejectedBadCsv = /date, metric, and value/i.test(error.message);
}
assert(rejectedBadCsv, "bad CSV should show a useful column message");

const combined = [...jsonRecords, ...csvRecords, ...appleRecords];
const summary = healthImport.buildHealthSummary(combined, {
  periodStart: "2026-07-01",
  periodEnd: "2026-07-04",
});

assert(summary.recordCount === 17, "summary should count normalized records");
assert(summary.sleep.records === 3, "summary should count sleep records");
assert(summary.sleep.averageMinutes === 430, "summary should average sleep minutes");
assert(summary.wake.averageTime === "06:30", "summary should average wake time");
assert(summary.activity.stepsTotal === 9500, "summary should total steps");
assert(summary.activity.activeMinutesTotal === 65, "summary should total active minutes");
assert(summary.activity.activeEnergyTotal === 1015, "summary should total active energy");
assert(Math.round(summary.recovery.heartRateAverage) === 80, "summary should average heart rate");
assert(summary.recovery.restingHeartRateAverage === 61.5, "summary should average resting heart rate");
assert(summary.recovery.heartRateVariabilityAverage === 42, "summary should average HRV");
assert(!JSON.stringify(summary).includes("privateStageRows"), "summary must not expose raw metadata");

const row = healthImport.toHealthRecordRow(jsonRecords[0], { id: "user-1" });
assert(row.owner_id === "user-1", "cloud row should include owner id");
assert(row.source_record_id === "sleep-1", "cloud row should preserve source record id");
assert(row.metric === "sleep_minutes", "cloud row should preserve normalized metric");

const mapped = healthImport.mapHealthRecordRow({
  id: "row-1",
  owner_id: "user-1",
  source: "manual-csv",
  source_record_id: "steps-2",
  metric: "steps",
  recorded_at: "2026-07-03T00:00:00.000Z",
  date: "2026-07-03",
  value: 10000,
  unit: "count",
  metadata: {},
});

assert(mapped.ownerId === "user-1", "mapped row should expose camelCase ownerId");
assert(mapped.sourceRecordId === "steps-2", "mapped row should expose camelCase sourceRecordId");

let rejected = false;
try {
  healthImport.normalizeHealthRecord({ metric: "steps", date: "2026-07-01", value: -1 });
} catch {
  rejected = true;
}
assert(rejected, "invalid negative steps should be rejected");

console.log("Health import checks passed.");
