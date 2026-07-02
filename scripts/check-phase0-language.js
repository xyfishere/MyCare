const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "app.js");
const htmlPath = path.join(root, "index.html");
const quotesPath = path.join(root, "morning-quotes.json");
const languageCorePath = path.join(root, "src", "core", "language.js");

const app = fs.readFileSync(appPath, "utf8");
const html = fs.readFileSync(htmlPath, "utf8");
const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf8"));
const language = require(languageCorePath);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertSingleLanguage(value, label) {
  assert(language.isQuoteLanguageCompatible(value), `${label} mixes Chinese and English`);
}

assert(Array.isArray(quotes), "morning-quotes.json must contain an array");
assert(quotes.length >= 2, "morning-quotes.json should contain at least two quotes");

quotes.forEach((quote, index) => {
  const zh = String(quote.zh || quote.prompt || "").trim();
  const en = String(quote.en || quote.promptEn || "").trim();
  assert(zh, `quote ${index + 1} is missing Chinese text`);
  assert(en, `quote ${index + 1} is missing English text`);
  assert(language.hasChinese(zh), `quote ${index + 1} Chinese text should contain Chinese characters`);
  assert(language.hasEnglishWords(en), `quote ${index + 1} English text should contain English words`);
  assertSingleLanguage(zh, `quote ${index + 1} Chinese text`);
  assertSingleLanguage(en, `quote ${index + 1} English text`);
});

assert(
  html.includes("src/core/language.js"),
  "index.html must load the language core before app.js",
);

assert(
  app.includes("prompt: zh ? (step.prompt || step.promptEn) : (step.promptEn || step.prompt)"),
  "Morning quote rendering must choose text by active language",
);

assert(
  app.includes("syncBuiltInSelfCareQuotes(canonicalMorningQuotes)"),
  "Cloud state loading must resync built-in self-care quotes",
);

assert(
  app.includes("window.MyCare.language.formatSkinStateLabel"),
  "Stats skin labels must use the shared language core",
);

assert(
  app.includes("window.MyCare.language.shouldKeepSavedQuote"),
  "Built-in quote cleanup must use the shared language core",
);

console.log("Phase 0 language checks passed.");
