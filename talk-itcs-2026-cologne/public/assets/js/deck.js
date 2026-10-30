(() => {
  const root = document.documentElement;
  const deck = document.querySelector(".deck");
  const slides = [...deck.querySelectorAll(":scope > .slide")];
  const controls = document.querySelector(".controls");
  const baseTitle = document.title;
  const stageW = deck.offsetWidth;
  const stageH = deck.offsetHeight;
  let index = 0;
  let step = 0;
  let overview = false;
  let selected = 0;
  let overviewCols = 4;

  // Fragmente je Folie zu Schritten gruppieren: data-step teilt sich einen Schritt
  const stepsOf = slides.map((slide) => {
    const fragments = [...slide.querySelectorAll(".fragment")];
    const explicit = fragments.map((f) => Number(f.dataset.step)).filter(Boolean);
    let next = explicit.length ? Math.max(...explicit) : 0;
    fragments.forEach((f) => { f.fragmentStep = Number(f.dataset.step) || ++next; });
    const order = [...new Set(fragments.map((f) => f.fragmentStep))].sort((a, b) => a - b);
    fragments.forEach((f) => { f.fragmentRank = order.indexOf(f.fragmentStep) + 1; });
    return { fragments, count: order.length };
  });

  function buildFooters() {
    const talk = deck.dataset.talkTitle || "";
    let section = "";
    slides.forEach((slide, i) => {
      if (slide.dataset.sectionTitle) section = slide.dataset.sectionTitle;
      if (slide.classList.contains("no-footer")) return;
      const footer = document.createElement("footer");
      footer.className = "slide__footer";
      [["talk", talk], ["section", section], ["num", String(i + 1)]].forEach(([name, text]) => {
        const span = document.createElement("span");
        span.className = `slide__footer-${name}`;
        span.textContent = text;
        footer.append(span);
      });
      slide.append(footer);
    });
  }

  function fit() {
    if (overview) { layoutOverview(); return; }
    const scale = Math.min(window.innerWidth / stageW, window.innerHeight / stageH);
    const x = (window.innerWidth - stageW * scale) / 2;
    const y = (window.innerHeight - stageH * scale) / 2;
    deck.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function render() {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active && !overview));
      stepsOf[i].fragments.forEach((f) => {
        f.classList.toggle("is-visible", i < index || (active && f.fragmentRank <= step));
      });
    });
    document.title = `${slides[index].dataset.title} – ${baseTitle}`;
    controls.querySelector("[data-action=prev]").disabled = index === 0 && step === 0;
    controls.querySelector("[data-action=next]").disabled = index === slides.length - 1 && step === stepsOf[index].count;
  }

  function hashFor(i, s) { return s > 0 ? `#/${i + 1}/${s}` : `#/${i + 1}`; }

  function go(i, s) {
    const hash = hashFor(i, s);
    if (location.hash === hash) { index = i; step = s; render(); return; }
    location.hash = hash;
  }

  function readHash() {
    const match = location.hash.match(/^#\/(\d+)(?:\/(\d+))?$/);
    index = match ? Math.min(Math.max(Number(match[1]), 1), slides.length) - 1 : 0;
    step = match && match[2] ? Math.min(Number(match[2]), stepsOf[index].count) : 0;
    render();
  }

  function next() {
    if (step < stepsOf[index].count) go(index, step + 1);
    else if (index < slides.length - 1) go(index + 1, 0);
  }

  function prev() {
    if (step > 0) go(index, step - 1);
    else if (index > 0) go(index - 1, stepsOf[index - 1].count);
  }

  function layoutOverview() {
    const gap = 28;
    const width = deck.clientWidth;
    overviewCols = width < 700 ? 2 : width < 1200 ? 3 : 4;
    const scale = (width - gap * (overviewCols + 1)) / overviewCols / stageW;
    slides.forEach((slide, i) => {
      const x = gap + (i % overviewCols) * (stageW * scale + gap);
      const y = gap + Math.floor(i / overviewCols) * (stageH * scale + gap);
      slide.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    });
  }

  function select(i) {
    selected = Math.min(Math.max(i, 0), slides.length - 1);
    slides.forEach((slide, n) => slide.classList.toggle("is-selected", n === selected));
    const rect = slides[selected].getBoundingClientRect();
    if (rect.top < 0) deck.scrollTop += rect.top - 28;
    else if (rect.bottom > window.innerHeight) deck.scrollTop += rect.bottom - window.innerHeight + 28;
  }

  function toggleOverview(open) {
    overview = open;
    root.classList.toggle("is-overview", open);
    if (open) {
      deck.style.transform = "";
      layoutOverview();
      select(index);
    } else {
      slides.forEach((slide) => { slide.style.transform = ""; slide.classList.remove("is-selected"); });
      deck.scrollTop = 0;
      fit();
    }
    render();
  }

  function pick(i) {
    toggleOverview(false);
    go(i, 0);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (root.requestFullscreen) root.requestFullscreen();
  }

  function onOverviewKey(key) {
    if (key === "ArrowRight") select(selected + 1);
    else if (key === "ArrowLeft") select(selected - 1);
    else if (key === "ArrowDown") select(selected + overviewCols);
    else if (key === "ArrowUp") select(selected - overviewCols);
    else if (key === "Enter") pick(selected);
    else return false;
    return true;
  }

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const { key, shiftKey } = event;
    let handled = true;
    if (key === "o" || key === "O" || key === "Escape") toggleOverview(!overview);
    else if (key === "f" || key === "F") toggleFullscreen();
    else if (overview) handled = onOverviewKey(key);
    else if (key === " " && shiftKey) prev();
    else if (key === " " || key === "ArrowRight" || key === "ArrowDown" || key === "PageDown") next();
    else if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp") prev();
    else if (key === "Home") go(0, 0);
    else if (key === "End") go(slides.length - 1, stepsOf[slides.length - 1].count);
    else handled = false;
    if (handled) event.preventDefault();
  });

  deck.addEventListener("click", (event) => {
    if (!overview) return;
    const slide = event.target.closest(".slide");
    if (slide) { event.preventDefault(); pick(slides.indexOf(slide)); }
  });

  // Wischgesten
  let touchX = null;
  let touchY = null;
  deck.addEventListener("touchstart", (event) => {
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
  }, { passive: true });
  deck.addEventListener("touchend", (event) => {
    if (overview || touchX === null) return;
    const dx = event.changedTouches[0].clientX - touchX;
    const dy = event.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next(); else prev();
  }, { passive: true });

  // Steuerknöpfe bei Mausbewegung einblenden
  const actions = { prev, next, overview: () => toggleOverview(!overview), fullscreen: toggleFullscreen };
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    actions[button.dataset.action]();
    button.blur();
  });
  let hideTimer;
  function showControls() {
    controls.classList.add("is-visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => controls.classList.remove("is-visible"), 2500);
  }
  document.addEventListener("mousemove", showControls);
  document.addEventListener("touchstart", showControls, { passive: true });

  window.addEventListener("hashchange", () => {
    if (overview) toggleOverview(false);
    readHash();
  });
  window.addEventListener("resize", fit);

  buildFooters();
  fit();
  readHash();
})();
