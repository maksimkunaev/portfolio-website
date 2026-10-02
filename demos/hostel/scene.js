/* Тупая визуализация (CLAUDE.md п.10): THREE-сцена рисует то, что прислал
   сервер. Координаты считает слой раскладки (сервер, /api/scene); здесь —
   только меш по look в pos и анимация смены pos между кадрами.
   Имён правил, действий и логики мира здесь нет. */
(async function () {
  const api = (p, body) => fetch(p, body === undefined ? undefined
    : { method: "POST", body: JSON.stringify(body) }).then(r => r.json());

  const WORLD = await api("/api/world");     /* {entities} */
  let CUR = (await api("/api/state")).state; /* [[rel,x,y]...] */
  let SC = await api("/api/scene");          /* {id: {pos,size?,rot?,kind,label,look,color?}} */
  const fact = (r, x, y) => CUR.some(([a, b, c]) => a === r && b === x && c === y);
  const V3 = p => new THREE.Vector3(p[0], p[1], p[2]);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10141c);
  scene.fog = new THREE.Fog(0x10141c, 30, 70);
  const cam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, .1, 200);
  cam.position.set(13, 11, 15);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("c"), antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  const controls = new THREE.OrbitControls(cam, renderer.domElement);
  controls.target.set(0, 3.2, 0); controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.55;

  scene.add(new THREE.AmbientLight(0xffffff, .55));
  const sun = new THREE.DirectionalLight(0xffffff, .9); sun.position.set(8, 20, 10); scene.add(sun);
  const fill = new THREE.DirectionalLight(0x88aaff, .3); fill.position.set(-10, 6, -8); scene.add(fill);

  function label(text, scale = 1, color = "#dfe7f5") {
    const cv = document.createElement("canvas"); cv.width = 256; cv.height = 64;
    const g = cv.getContext("2d"); g.font = "600 30px system-ui"; g.textAlign = "center";
    g.fillStyle = color; g.shadowColor = "#000"; g.shadowBlur = 6;
    g.fillText(text, 128, 42);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false
    }));
    sp.scale.set(4 * scale, 1 * scale, 1); return sp;
  }

  /* ===== меш по look ===== */
  const floorMat = f => new THREE.MeshStandardMaterial({
    color: [0x232b3c, 0x28324a, 0x2d3a57][f % 3], roughness: .9, transparent: true,
    opacity: .55, depthWrite: false
  });
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x3a4560, roughness: .8, transparent: true, opacity: .55
  });
  const LOOKS = {
    place(e) { /* плита-пол + бортики + подпись; pos — центр пола */
      const g = new THREE.Group(), [w, d] = e.size;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, .18, d), floorMat(e.floor));
      slab.position.y = -.09; g.add(slab);
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(slab.geometry),
        new THREE.LineBasicMaterial({ color: 0x4a5a78 }));
      edge.position.y = -.09; g.add(edge);
      const lb = label(e.label, .75, "#93a5c4"); lb.position.set(0, .55, d / 2 - .5); g.add(lb);
      const h = .65;
      const mk = (sx, sz, px, pz) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(sx, h, sz), wallMat);
        m.position.set(px, h / 2, pz); g.add(m);
      };
      mk(w, .1, 0, -d / 2); mk(w, .1, 0, d / 2); mk(.1, d, -w / 2, 0); mk(.1, d, w / 2, 0);
      return g;
    },
    door(e, id) { /* кликабельный слэб; pos — низ двери */
      const g = new THREE.Group(), [sx, sy, sz] = e.size;
      const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz),
        new THREE.MeshStandardMaterial({ color: 0x4cd97b, emissive: 0x0a3018, roughness: .5 }));
      m.position.y = sy / 2; m.userData.door = id; g.add(m);
      g.userData.slab = m; return g;
    },
    stairs(e) { /* наклонная плита со ступеньками; pos — центр, rot — наклон */
      const g = new THREE.Group(), [w, h, len] = e.size;
      g.add(new THREE.Mesh(new THREE.BoxGeometry(w, h, len),
        new THREE.MeshStandardMaterial({ color: 0x6c7fa8, roughness: .7 })));
      for (let i = 1; i < 7; i++) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(w, .05, .12),
          new THREE.MeshStandardMaterial({ color: 0x8fa3c8 }));
        st.position.set(0, h / 2 + .03, -len / 2 + len * i / 7); g.add(st);
      }
      g.rotation.order = "YXZ"; g.rotation.set(e.rot[0], e.rot[1], e.rot[2]);
      return g;
    },
    person(e) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.3, .36, 1.1, 14),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(e.color), roughness: .4 }));
      body.position.y = .85; g.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(.26, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xffd9a0, roughness: .5 }));
      head.position.y = 1.65; g.add(head);
      const lb = label(e.label, .7); lb.position.y = 2.2; g.add(lb);
      g.userData.hop = true; return g;
    },
    box(e) { /* неизвестный вид — кубик с подписью */
      const g = new THREE.Group();
      const box = new THREE.Mesh(new THREE.BoxGeometry(.5, .35, .5),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(e.color || "#aaaaaa"), roughness: .5 }));
      box.position.y = .18; g.add(box);
      const lb = label(e.label, .5); lb.position.y = .8; g.add(lb);
      return g;
    },
  };
  const meshes = {};
  function build(id, e) {
    const g = (LOOKS[e.look] || LOOKS.box)(e, id);
    g.position.copy(V3(e.pos)); scene.add(g); meshes[id] = g;
  }
  for (const [id, e] of Object.entries(SC)) build(id, e);
  const doorSlabs = () => Object.values(meshes).map(g => g.userData.slab).filter(Boolean);

  /* ===== смена сцены: всё, чей pos сменился, едет от старого к новому ===== */
  const moves = {}; /* id -> {from,to,t} */
  function applyScene(next) {
    let moved = false;
    for (const [id, e] of Object.entries(next)) {
      if (!meshes[id]) { build(id, e); continue; }
      meshes[id].visible = true;
      const to = V3(e.pos);
      if (!meshes[id].position.equals(to)) {
        moves[id] = { from: meshes[id].position.clone(), to, t: 0 }; moved = true;
      }
    }
    for (const id of Object.keys(meshes)) if (!next[id]) meshes[id].visible = false;
    SC = next; return moved;
  }
  function syncDoors() {
    for (const m of doorSlabs()) {
      const open = fact("openness", m.userData.door, "open");
      m.material.color.set(open ? 0x4cd97b : 0xff5d5d);
      m.material.emissive.set(open ? 0x0a3018 : 0x3d0f0f);
      m.parent.rotation.y = open ? Math.PI / 3 : 0;
    }
  }

  /* ===== plan card ===== */
  const planEl = document.getElementById("plan");
  function line(t, cls) {
    const s = document.createElement("div"); s.className = cls || "step";
    s.textContent = t; planEl.appendChild(s); planEl.scrollTop = 1e9;
  }
  const show = f => `${f[0]}(${f[1]}, ${f[2]})`;
  function clearPlan() { planEl.innerHTML = ""; }

  /* ===== проигрывание кадров ===== */
  let queue = [], animating = false;
  function nextFrame() {
    if (!queue.length) {
      animating = false; runBtn.disabled = false; stepBtn.disabled = false;
      showTimeline();
      return;
    }
    const f = queue.shift();
    CUR = f.state;
    line(`${queue.length ? "▸" : "▸"} ${f.label}`, "step");
    for (const d of f.diff.del) line(`   − ${show(d)}`, "del");
    for (const a of f.diff.add) line(`   + ${show(a)}`, "add");
    const moved = applyScene(f.scene);
    syncDoors();
    if (!moved) setTimeout(nextFrame, 600);
  }

  /* ===== цель: parse → run ===== */
  const goalText = document.getElementById("goaltext"),
    parseBtn = document.getElementById("parse"),
    runBtn = document.getElementById("run"),
    goalEl = document.getElementById("goalfacts");
  let GOAL = null;
  goalText.oninput = () => { GOAL = null; runBtn.disabled = true; goalEl.hidden = true; };
  goalText.onkeydown = e => {
    if (e.key === "Enter") { e.preventDefault(); parseBtn.click(); }
  };
  parseBtn.onclick = async () => {
    parseBtn.disabled = true; goalEl.hidden = false;
    goalEl.textContent = "the parser is thinking…";
    const res = await api("/api/parse", { text: goalText.value });
    parseBtn.disabled = false;
    if (res.error) { GOAL = null; runBtn.disabled = true; goalEl.textContent = `refused: ${res.error}`; return; }
    GOAL = res.goal; runBtn.disabled = false;
    goalEl.innerHTML = "";
    for (const f of GOAL) {
      const d = document.createElement("div"); d.className = "fact";
      d.textContent = "∧ " + show(f); goalEl.appendChild(d);
    }
  };
  runBtn.onclick = async () => {
    if (animating || !GOAL) return;
    clearPlan(); animating = true; runBtn.disabled = true;
    line("goal: " + GOAL.map(show).join(" ∧ "), "muted");
    const res = await api("/api/plan", { goal: GOAL });
    if (res.steps === null) {
      line("no plan", "bad");
      line("gap — missing if-facts:", "muted");
      for (const g of res.gap) line("   ? " + show(g), "muted");
      animating = false; runBtn.disabled = false; return;
    }
    line(`plan: ${res.steps.length} steps`, "muted");
    queue = res.steps.slice();
    nextFrame();
  };
  const stepBtn = document.getElementById("step");
  stepBtn.onclick = async () => {
    if (animating) return;
    clearPlan(); animating = true; stepBtn.disabled = true;
    const n = +document.getElementById("stepn").value || 1;
    const res = await api("/api/step", { n });
    if (res.error) {
      line("step refused: " + res.error, "bad");
      animating = false; stepBtn.disabled = false; return;
    }
    line(`steps: ${res.steps.length}`, "muted");
    queue = res.steps.slice();
    nextFrame();
  };
  document.getElementById("reset").onclick = async () => {
    if (animating) return;
    const res = await api("/api/reset", {});
    CUR = res.state; applyScene(res.scene);
    clearPlan(); line("world reset to start", "muted");
    syncDoors(); showTimeline();
  };

  /* ===== таймлайн: записи сервера; клик — показать сцену записи (просмотр) ===== */
  const tlEl = document.getElementById("timeline");
  async function showTimeline() {
    const TL = (await api("/api/timeline")).timeline;
    tlEl.innerHTML = "";
    for (const rec of TL) {
      const d = document.createElement("div"); d.className = "rec";
      d.textContent = `${rec.n} · ${rec.cause} · ${rec.fired.map(f => f.label).join(", ")}`;
      d.onclick = () => {
        if (animating) return;
        for (const o of tlEl.children) o.classList.toggle("on", o === d);
        CUR = rec.state; applyScene(rec.scene); syncDoors();
        showRecord(rec, TL[TL.length - 1].n);
      };
      tlEl.appendChild(d);
    }
    tlEl.scrollLeft = 1e9;
    detEl.hidden = true;
  }

  /* запись таймлайна: кто сработал, diff, по клику — полный стейт записи */
  const detEl = document.getElementById("tldetail");
  function showRecord(rec, last) {
    const row = (cls, text) => {
      const d = document.createElement("div");
      d.className = cls; d.textContent = text; detEl.appendChild(d); return d;
    };
    detEl.innerHTML = ""; detEl.hidden = false;
    const head = row("head", `record ${rec.n} · ${rec.cause}`);
    const x = document.createElement("span");
    x.className = "x"; x.textContent = "×"; x.onclick = () => detEl.hidden = true;
    head.appendChild(x);
    if (rec.n !== last) row("muted", `viewing the past; the world is now at record ${last}`);
    for (const f of rec.fired)
      row("step", `▸ ${f.label} (${f.rule})  ` +
        Object.entries(f.binding).map(([k, v]) => `${k}=${v}`).join(" "));
    for (const t of rec.diff.del) row("del", `   − ${show(t)}`);
    for (const t of rec.diff.add) row("add", `   + ${show(t)}`);
    if (rec.derived.length) row("sec", "derived (not stored)");
    for (const t of rec.derived) row("derived", `   = ${show(t)}`);
    const full = row("full", `full state (${rec.state.length} triples) ▸`);
    const list = document.createElement("div"); list.hidden = true; detEl.appendChild(list);
    const item = (cls, text) => {
      const d = document.createElement("div"); d.className = cls;
      d.textContent = text; list.appendChild(d);
    };
    for (const t of rec.state) item("muted", show(t));
    if (rec.derived.length) item("sec", "derived (not stored)");
    for (const t of rec.derived) item("derived", show(t));
    full.onclick = () => {
      list.hidden = !list.hidden;
      full.textContent = `full state (${rec.state.length} triples) ${list.hidden ? "▸" : "▾"}`;
    };
  }
  showTimeline();

  /* ===== словарь и правила: только отрисовка того, что отдал API ===== */
  (async function vocabCard() {
    const card = document.getElementById("vocab"),
      body = document.getElementById("vocabbody"),
      toggle = document.getElementById("vocabtoggle");
    toggle.onclick = () => {
      const open = card.dataset.open === "1" ? "0" : "1";
      card.dataset.open = open;
      toggle.textContent = "Vocabulary and rules " + (open === "1" ? "▾" : "▸");
    };
    const M = (await api("/api/modules")).modules; /* [{name, vocab, rules}], последний — весь мир */
    const tabs = document.createElement("div"), list = document.createElement("div");
    tabs.className = "tabs"; body.append(tabs, list);
    const div = (cls, text) => {
      const d = document.createElement("div");
      d.className = cls; d.textContent = text; list.appendChild(d);
    };
    const render = part => {
      list.innerHTML = "";
      for (const b of tabs.children) b.classList.toggle("on", b.textContent === part.name);
      const V = part.vocab, R = part.rules;
      div("sec", "kinds");
      for (const [k, desc] of Object.entries(V.kinds)) {
        div("sym", k); div("desc", desc);
      }
      div("sec", "properties");
      for (const [p, spec] of Object.entries(V.props)) {
        div("sym", `${p} (of ${spec.of})`);
        for (const [v, desc] of Object.entries(spec.values))
          div("desc", `${v} — ${desc}`);
      }
      div("sec", "relations");
      for (const [r, spec] of Object.entries(V.relations)) {
        div("sym", `${r}${spec.functional_for?.length ? " · functional for " + spec.functional_for.join(", ") : ""}`);
        div("desc", spec.desc);
      }
      div("sec", `rules (${R.length})`);
      for (const rule of R) {
        div("rule", `${rule.label || rule.id}:`);
        div("body", rule.if.map(show).join(" ∧ "));
        div("body", "→ " + rule.then.map(show).join(" ∧ "));
        div("desc", Object.entries(rule.kinds).map(([v, k]) => `${v}:${k}`).join("  "));
      }
    };
    for (const part of M) {
      const b = document.createElement("button");
      b.textContent = part.name; b.onclick = () => render(part); tabs.appendChild(b);
    }
    render(M[M.length - 1]);
  })();

  /* ===== карточка «Стейт»: рука бога над тройками, валидация — сервер ===== */
  const $ = id => document.getElementById(id);
  const stateCard = $("state"), stateToggle = $("statetoggle");
  const setStateOpen = open => {
    stateCard.dataset.open = open ? "1" : "0";
    stateToggle.textContent = "State " + (open ? "▾" : "▸");
  };
  stateToggle.onclick = () => setStateOpen(stateCard.dataset.open !== "1");
  setStateOpen(location.hash === "#state");
  const V = await api("/api/vocab");
  const fillList = (id, items) => { $(id).innerHTML = ""; for (const v of items) {
    const o = document.createElement("option"); o.value = v; $(id).appendChild(o); } };
  const entities = Object.keys(WORLD.entities);
  fillList("dl_rel", ["kind", ...Object.keys(V.props), ...Object.keys(V.relations)]);
  fillList("dl_ent", entities);
  fillList("dl_val", [...entities, ...Object.keys(V.kinds),
    ...Object.values(V.props).flatMap(p => Object.keys(p.values))]);
  fillList("nkind", Object.keys(V.kinds));
  for (const o of $("nkind").children) o.textContent = o.value;
  let pickPos = null;
  $("nkind").onchange = () => {
    const place = $("nkind").value === "place";
    $("nfloor").hidden = $("npos").hidden = !place; pickPos = null;
    $("npos").textContent = "place: click the scene where it stands";
  };
  async function sendEdit(body) { /* ответ сервера как есть; успех — перерисовка сцены */
    const res = await api("/api/edit", body);
    if (res.error) { $("stateerr").textContent = "refused: " + res.error; return; }
    location.hash = "state"; location.reload();
  }
  $("addfact").onclick = () => sendEdit({ add: [[$("fr").value, $("fx").value, $("fy").value]] });
  $("addent").onclick = () => {
    const id = $("nid").value, kind = $("nkind").value, body = { add: [["kind", id, kind]] };
    if (pickPos) body.anchor = { [id]: { pos: pickPos, size: [4, 4] } };
    sendEdit(body);
  };
  const groups = {};
  for (const f of CUR) (groups[f[1]] = groups[f[1]] || []).push(f);
  for (const [e, fs] of Object.entries(groups).sort()) {
    const h = document.createElement("div"); h.className = "sec"; h.textContent = e;
    $("factlist").appendChild(h);
    for (const f of fs) {
      const row = document.createElement("div"); row.className = "row";
      const t = document.createElement("span"); t.textContent = show(f);
      const x = document.createElement("button"); x.className = "x"; x.textContent = "✕";
      x.onclick = () => sendEdit({ del: [f] });
      row.append(t, x); $("factlist").appendChild(row);
    }
  }
  function pickPlacePos(e) { /* клик по сцене -> координата нового места на выбранном этаже */
    const f = +$("nfloor").value;
    const onFloor = Object.values(SC).find(e => e.look === "place" && e.floor === f);
    const hit = new THREE.Vector3();
    if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(onFloor ? onFloor.pos[1] : 0)), hit)) return;
    pickPos = [+hit.x.toFixed(1), f, +hit.z.toFixed(1)];
    $("npos").textContent = `place: (${pickPos.join(", ")})`;
  }

  /* клик по двери = правка стейта через /api/edit */
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  let down = null;
  addEventListener("pointerdown", e => down = [e.clientX, e.clientY]);
  addEventListener("pointerup", async e => {
    if (e.target.id !== "c") return;
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6 || animating) return;
    mouse.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(mouse, cam);
    if ($("nkind").value === "place" && stateCard.dataset.open === "1") return pickPlacePos(e);
    const hit = ray.intersectObjects(doorSlabs())[0];
    if (!hit) return;
    const d = hit.object.userData.door;
    const v = fact("openness", d, "open") ? "shut" : "open";
    const res = await api("/api/edit", { add: [["openness", d, v]] });
    if (res.error) { line("edit refused: " + res.error, "bad"); return; }
    CUR = res.state;
    line(`edit: ${d} → ${v}`, "muted");
    syncDoors(); showTimeline();
  });

  /* ===== цикл ===== */
  const clock = new THREE.Clock();
  function draw() {
    requestAnimationFrame(draw);
    const dt = clock.getDelta();
    for (const [id, seg] of Object.entries(moves)) {
      seg.t += dt / 1.1;
      const k = Math.min(seg.t, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      meshes[id].position.lerpVectors(seg.from, seg.to, e);
      if (meshes[id].userData.hop) meshes[id].position.y += Math.abs(Math.sin(k * Math.PI * 4)) * .12;
      if (k >= 1) {
        delete moves[id];
        if (animating && !Object.keys(moves).length) setTimeout(nextFrame, 100);
      }
    }
    controls.update();
    renderer.render(scene, cam);
  }
  addEventListener("resize", () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight);
  });

  syncDoors(); draw();
})();
