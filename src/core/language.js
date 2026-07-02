(function initLanguageCore(global) {
  const namespace = global.MyCare || {};

  const skinStateLabels = {
    "稳定": { zh: "稳定", en: "Stable" },
    "干燥": { zh: "干燥", en: "Dry" },
    "泛红": { zh: "泛红", en: "Redness" },
    "爆痘": { zh: "爆痘", en: "Breakout" },
    "敏感": { zh: "敏感", en: "Sensitive" },
    Stable: { zh: "稳定", en: "Stable" },
    Dry: { zh: "干燥", en: "Dry" },
    Redness: { zh: "泛红", en: "Redness" },
    Breakout: { zh: "爆痘", en: "Breakout" },
    Sensitive: { zh: "敏感", en: "Sensitive" },
  };

  function hasChinese(value = "") {
    return /[\u3400-\u9fff]/.test(value);
  }

  function hasEnglishWords(value = "") {
    return /[A-Za-z]{3,}/.test(value);
  }

  function looksLikeMojibake(value = "") {
    return /[�]|鐖|濡傛|鎴戝|璇讳|浠婃|鏅ㄩ|楗ラ|鐨|锛|鈥|銆|€/.test(value);
  }

  function isQuoteLanguageCompatible(value = "", language = "") {
    const hasZh = hasChinese(value);
    const hasEn = hasEnglishWords(value);
    if (hasZh && hasEn) return false;
    if (language === "zh") return hasZh || !hasEn;
    if (language === "en") return !hasZh;
    return true;
  }

  function shouldKeepSavedQuote(value, canonical, alternate, language = "") {
    if (!value) return false;
    if (value === canonical || value === alternate) return false;
    if (!isQuoteLanguageCompatible(value, language)) return false;
    return !looksLikeMojibake(value);
  }

  function formatSkinStateLabel(value, language = "zh") {
    const label = skinStateLabels[value];
    if (!label) return value || "";
    return language === "zh" ? label.zh : label.en;
  }

  namespace.language = {
    formatSkinStateLabel,
    hasChinese,
    hasEnglishWords,
    isQuoteLanguageCompatible,
    looksLikeMojibake,
    shouldKeepSavedQuote,
    skinStateLabels,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.language;
  }
})(typeof window !== "undefined" ? window : globalThis);
