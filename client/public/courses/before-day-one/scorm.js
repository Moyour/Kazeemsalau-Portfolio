/* SCORM 1.2 for Before Day One.
   Finds the LMS API in a parent frame and reports the final check.
   Outside an LMS every call does nothing, so the course still plays on its own. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else {
    const tracker = api.create(root);
    tracker.start();
    root.addEventListener("pagehide", function () { tracker.finish(); });
    root.BDOScorm = tracker;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function ok(value) {
    return value === true || value === "true";
  }

  function findAPI(win) {
    let current = win;
    let guard = 0;
    while (current && guard < 15) {
      if (current.API) return current.API;
      if (!current.parent || current.parent === current) break;
      current = current.parent;
      guard += 1;
    }
    try {
      if (win.opener && win.opener.API) return win.opener.API;
    } catch (_) {}
    return null;
  }

  function percent(score, max) {
    const top = Number(max) > 0 ? Number(max) : 5;
    const raw = Math.max(0, Math.min(top, Number(score) || 0));
    return String(Math.round((raw / top) * 100));
  }

  function create(win) {
    const api = findAPI(win);
    let started = false;
    let finished = false;
    let passed = false;

    function set(key, value) {
      if (!api) return;
      api.LMSSetValue(key, value);
    }

    function start() {
      if (!api || started) return false;
      const init = api.LMSInitialize("");
      const already = !ok(init) && String(api.LMSGetLastError ? api.LMSGetLastError() : "") === "101";
      if (!ok(init) && !already) return false;
      started = true;
      const status = api.LMSGetValue("cmi.core.lesson_status") || "";
      if (status !== "passed" && status !== "completed") {
        set("cmi.core.lesson_status", "incomplete");
        api.LMSCommit("");
      } else {
        passed = true;
      }
      return true;
    }

    function pass(score, max) {
      if (!api) return false;
      if (!started) start();
      if (!started) return false;
      set("cmi.core.score.min", "0");
      set("cmi.core.score.max", "100");
      set("cmi.core.score.raw", percent(score, max));
      set("cmi.core.lesson_status", "passed");
      api.LMSCommit("");
      passed = true;
      return finish();
    }

    function finish() {
      if (!api || !started || finished) return false;
      if (!passed) set("cmi.core.exit", "suspend");
      api.LMSCommit("");
      const done = api.LMSFinish("");
      finished = ok(done) || done === "" || done == null;
      if (!finished && api.LMSGetLastError && String(api.LMSGetLastError()) === "101") finished = true;
      return finished;
    }

    return { api: api, start: start, pass: pass, finish: finish };
  }

  return { findAPI: findAPI, percent: percent, create: create };
});
