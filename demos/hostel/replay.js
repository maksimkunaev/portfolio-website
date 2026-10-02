/* Запись вместо сервера: fetch("/api/...") отвечает тем, что настоящий сервер
   ответил при записи (data.js). Таймлайн ведётся здесь же, как на сервере.
   Свободный текст и правки стейта в записи не живут — честный отказ. */
(function () {
  const D = window.HOSTEL_DEMO;
  const clone = o => JSON.parse(JSON.stringify(o));
  const norm = t => t.trim().toLowerCase().replace(/\s+/g, " ");
  const reply = (o, ms = 0) => new Promise(done =>
    setTimeout(() => done({ json: () => Promise.resolve(clone(o)) }), ms));
  const NOT_RECORDED = "this is a recorded run — pick one of the goals above";
  let timeline = clone(D.timeline.timeline);

  function planned(goal) {
    const p = D.presets.find(p => JSON.stringify(p.parse.goal) === JSON.stringify(goal));
    if (!p) return { steps: null, gap: [] };
    for (const f of p.plan.steps || [])
      timeline.push({ n: timeline.length, cause: "plan", fired: f.fired, diff: f.diff,
        state: f.state, derived: f.derived, scene: f.scene });
    return p.plan;
  }

  window.fetch = (path, opts) => {
    const body = opts && opts.body ? JSON.parse(opts.body) : {};
    if (path === "/api/timeline") return reply({ timeline });
    if (path === "/api/reset") { timeline = clone(D.timeline.timeline); return reply(D.reset); }
    if (path === "/api/parse") {
      const p = D.presets.find(p => norm(p.text) === norm(body.text || ""));
      return reply(p ? p.parse : { error: NOT_RECORDED }, 500);
    }
    if (path === "/api/plan") return reply(planned(body.goal), 300);
    if (path === "/api/step" || path === "/api/edit")
      return reply({ error: "not available in a recorded run", state: D.state.state });
    return reply(D[path.replace("/api/", "")]);
  };
})();
