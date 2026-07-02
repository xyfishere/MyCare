(function initStorageCore(global) {
  const namespace = global.MyCare || {};

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readJson(key, fallback = null) {
    try {
      const raw = global.localStorage?.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    global.localStorage?.setItem(key, JSON.stringify(value));
  }

  function mergeState(defaultState, savedState = {}) {
    return {
      ...clone(defaultState),
      ...(savedState || {}),
      settings: {
        ...clone(defaultState).settings,
        ...((savedState || {}).settings || {}),
      },
    };
  }

  namespace.storage = {
    clone,
    mergeState,
    readJson,
    writeJson,
  };

  global.MyCare = namespace;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = namespace.storage;
  }
})(typeof window !== "undefined" ? window : globalThis);
