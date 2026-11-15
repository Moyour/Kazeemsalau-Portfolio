/* Progress for Before Day One.
   One record per learner name, plus a pointer to whoever played last
   on this browser. Scene numbers are 1–8. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.BDOProgress = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const KEY = "bdo-progress-v1";
  const SCENE_TITLES = {
    1: "The offer",
    2: "Sign and send",
    3: "The preboarding inbox",
    4: "The night before",
    5: "The morning of",
    6: "At your desk",
    7: "First team call",
    8: "End of Day One"
  };

  function emptyStore() {
    return { last: "", learners: {} };
  }

  function normaliseName(name) {
    return String(name || "").trim().replace(/\s+/g, " ").toLowerCase();
  }

  function displayName(name) {
    const trimmed = String(name || "").trim().replace(/\s+/g, " ");
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  function isScene(n) {
    return Number.isInteger(n) && n >= 1 && n <= 8;
  }

  function parseStore(raw) {
    if (!raw) return emptyStore();
    try {
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object" || !data.learners || typeof data.learners !== "object") return emptyStore();
      return { last: typeof data.last === "string" ? data.last : "", learners: data.learners };
    } catch (_) {
      return emptyStore();
    }
  }

  function recordOk(rec) {
    return !!(rec && typeof rec.name === "string" && isScene(rec.scene));
  }

  function saveProgress(store, name, scene, now) {
    const key = normaliseName(name);
    const shown = displayName(name);
    const base = store && store.learners ? store : emptyStore();
    if (!key || !isScene(scene)) return { last: base.last || "", learners: { ...base.learners } };
    const prev = base.learners[key] || {};
    return {
      last: key,
      learners: {
        ...base.learners,
        [key]: { name: shown, scene: scene, updated: now || Date.now(), completed: prev.completed === true }
      }
    };
  }

  function markComplete(store, name, now) {
    const key = normaliseName(name);
    const shown = displayName(name);
    const base = store && store.learners ? store : emptyStore();
    if (!key) return { last: base.last || "", learners: { ...base.learners } };
    const prev = base.learners[key] || {};
    return {
      last: key,
      learners: {
        ...base.learners,
        [key]: {
          name: shown,
          scene: isScene(prev.scene) ? prev.scene : 8,
          updated: now || Date.now(),
          completed: true
        }
      }
    };
  }

  function hasCompleted(store, name) {
    if (!store || !store.learners) return false;
    const rec = store.learners[normaliseName(name)];
    return !!(rec && rec.completed === true);
  }

  function progressFor(store, name) {
    if (!store || !store.learners) return null;
    const rec = store.learners[normaliseName(name)];
    return recordOk(rec) ? rec : null;
  }

  function latestProgress(store) {
    if (!store || !store.learners) return null;
    const pointed = store.learners[store.last];
    return recordOk(pointed) ? pointed : null;
  }

  function clearProgress(store, name) {
    const base = store && store.learners ? store : emptyStore();
    const key = normaliseName(name);
    const learners = { ...base.learners };
    delete learners[key];
    return { last: base.last === key ? "" : (base.last || ""), learners: learners };
  }

  return {
    KEY: KEY,
    SCENE_TITLES: SCENE_TITLES,
    emptyStore: emptyStore,
    normaliseName: normaliseName,
    displayName: displayName,
    isScene: isScene,
    parseStore: parseStore,
    saveProgress: saveProgress,
    markComplete: markComplete,
    hasCompleted: hasCompleted,
    progressFor: progressFor,
    latestProgress: latestProgress,
    clearProgress: clearProgress
  };
});
