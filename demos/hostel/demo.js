/* Демо поверх того же UI: кнопки записанных целей. Клик = сброс мира ->
   текст цели -> Parse -> Run, теми же кнопками, что нажал бы человек. */
(function () {
  const D = window.HOSTEL_DEMO, $ = id => document.getElementById(id);
  const sleep = ms => new Promise(done => setTimeout(done, ms));
  const until = async ok => { while (!ok()) await sleep(150); };

  const box = document.createElement("div"); box.id = "presets";
  $("goaltext").after(box);
  document.querySelector("#ctrl .sub").textContent =
    "a recorded run of the real planner · pick a goal";
  document.querySelector("#ctrl p.sub:last-of-type").textContent =
    "drag to rotate, wheel to zoom";

  let busy = false;
  async function play(preset, button) {
    if (busy) return;
    busy = true;
    for (const b of box.children) b.classList.toggle("on", b === button);
    $("reset").click();
    await sleep(200);
    $("goaltext").value = preset.text;
    $("parse").click();
    await sleep(100);
    await until(() => !$("parse").disabled);
    await sleep(900);
    if (!$("run").disabled) {
      $("run").click();
      await sleep(600);
      await until(() => !$("run").disabled);
    }
    busy = false;
  }

  for (const preset of D.presets) {
    const b = document.createElement("button");
    b.textContent = preset.text; b.onclick = () => play(preset, b); box.appendChild(b);
  }
  /* на телефоне карточка плана свёрнута (demo.css); тап — развернуть */
  $("plan").onclick = () => {
    $("plan").dataset.open = $("plan").dataset.open === "1" ? "0" : "1";
    $("plan").scrollTop = 1e9;
  };
  setTimeout(() => box.firstChild.click(), 900);
})();
