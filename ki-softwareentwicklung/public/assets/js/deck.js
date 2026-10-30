/*
 * Slide engine: 16:9 scaling, keyboard/touch navigation, deep links (#/n or #/n/step),
 * step-by-step reveals (.fragment, optional data-step), overview grid, fullscreen.
 */
(function () {
  'use strict';

  var WIDTH = 1920;
  var HEIGHT = 1080;
  var TALK_TITLE = document.title;

  var stage = document.querySelector('.stage');
  var slides = Array.prototype.slice.call(stage.querySelectorAll(':scope > .slide'));
  var total = slides.length;
  var progressBar = document.querySelector('.progress__bar');
  var counter = document.querySelector('[data-counter]');
  var status = document.querySelector('[data-status]');
  var controls = document.querySelector('.controls');
  var overview = document.querySelector('.overview');

  var current = -1;
  var step = 0;
  var overviewBuilt = false;
  var overviewIndex = 0;

  /* ---------- connector lines (svg path[data-from][data-to]) ---------- */

  function anchorPoint(container, spec) {
    var parts = spec.split(' ');
    var el = container.querySelector('[data-anchor="' + parts[0] + '"]');
    if (!el) return null;
    var x = 0;
    var y = 0;
    for (var node = el; node && node !== container; node = node.offsetParent) {
      x += node.offsetLeft;
      y += node.offsetTop;
    }
    var w = el.offsetWidth;
    var h = el.offsetHeight;
    var t = parts[2] ? parseFloat(parts[2]) : 0.5;
    x += parts[3] ? parseFloat(parts[3]) : 0;
    switch (parts[1]) {
      case 'left': return { x: x, y: y + h * t, dir: 'h' };
      case 'right': return { x: x + w, y: y + h * t, dir: 'h' };
      case 'top': return { x: x + w * t, y: y, dir: 'v' };
      default: return { x: x + w * t, y: y + h, dir: 'v' };
    }
  }

  // Right-angled route with rounded corners: horizontal–vertical–horizontal or vertical–horizontal–vertical.
  function curve(a, b, mid) {
    var r = 12;
    var p = 'M' + a.x + ' ' + a.y;
    if (a.dir === 'h') {
      var mx = mid !== undefined ? mid : (a.x + b.x) / 2;
      var dy = b.y - a.y;
      if (Math.abs(dy) < 1) return p + ' L' + b.x + ' ' + b.y;
      var sx = mx > a.x ? 1 : -1;
      var sy = dy > 0 ? 1 : -1;
      var ex = b.x > mx ? 1 : -1;
      var rr = Math.min(r, Math.abs(dy) / 2);
      return p + ' L' + (mx - sx * rr) + ' ' + a.y + ' Q' + mx + ' ' + a.y + ' ' + mx + ' ' + (a.y + sy * rr) +
        ' L' + mx + ' ' + (b.y - sy * rr) + ' Q' + mx + ' ' + b.y + ' ' + (mx + ex * rr) + ' ' + b.y +
        ' L' + b.x + ' ' + b.y;
    }
    var my = mid !== undefined ? mid : (a.y + b.y) / 2;
    var dx = b.x - a.x;
    if (Math.abs(dx) < 1) return p + ' L' + b.x + ' ' + b.y;
    var vy = my > a.y ? 1 : -1;
    var hx = dx > 0 ? 1 : -1;
    var ey = b.y > my ? 1 : -1;
    var rv = Math.min(r, Math.abs(dx) / 2);
    return p + ' L' + a.x + ' ' + (my - vy * rv) + ' Q' + a.x + ' ' + my + ' ' + (a.x + hx * rv) + ' ' + my +
      ' L' + (b.x - hx * rv) + ' ' + my + ' Q' + b.x + ' ' + my + ' ' + b.x + ' ' + (my + ey * rv) +
      ' L' + b.x + ' ' + b.y;
  }

  // data-mid moves the bend to another anchor's x (or y), e.g. so that several lines merge there.
  function drawLinks() {
    stage.querySelectorAll('path[data-from][data-to]').forEach(function (path) {
      var container = path.ownerSVGElement.parentNode;
      var a = anchorPoint(container, path.dataset.from);
      var b = anchorPoint(container, path.dataset.to);
      if (!a || !b) return;
      var m = path.dataset.mid ? anchorPoint(container, path.dataset.mid) : null;
      path.setAttribute('d', curve(a, b, m ? (a.dir === 'h' ? m.x : m.y) : undefined));
    });
  }

  /* ---------- setup ---------- */

  function slideTitle(slide) {
    if (slide.dataset.title) return slide.dataset.title;
    var h = slide.querySelector('h1, h2, h3');
    return h ? h.textContent.trim() : '';
  }

  function assignSteps(slide) {
    var max = 0;
    var unique = new Set();
    var fragments = Array.prototype.slice.call(slide.querySelectorAll('.fragment'));
    fragments.forEach(function (el) {
      var n = parseInt(el.dataset.step, 10);
      if (isNaN(n)) n = max + 1;
      el.dataset.step = String(n);
      if (n > max) max = n;
      unique.add(n);
    });
    slide._steps = Array.from(unique).sort(function (a, b) { return a - b; });
    slide._fragments = fragments;
  }

  function addFooter(slide, index, section) {
    if (slide.classList.contains('no-footer')) return;
    var footer = document.createElement('footer');
    footer.className = 'slide-footer';
    footer.innerHTML =
      '<span class="slide-footer__title">' + TALK_TITLE + '</span>' +
      (section ? '<span class="slide-footer__section"></span>' : '') +
      '<span class="slide-footer__page">' + (index + 1) + '</span>';
    if (section) footer.querySelector('.slide-footer__section').textContent = section;
    slide.appendChild(footer);
  }

  var section = '';
  slides.forEach(function (slide, i) {
    if (slide.dataset.sectionTitle) section = slide.dataset.sectionTitle;
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'Folie');
    slide.setAttribute('aria-label', (i + 1) + ' von ' + total + ': ' + slideTitle(slide));
    assignSteps(slide);
    addFooter(slide, i, section);
  });

  /* ---------- scaling ---------- */

  function fit() {
    var scale = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    document.documentElement.style.setProperty('--scale', String(scale));
  }

  /* ---------- rendering ---------- */

  function renderFragments() {
    var slide = slides[current];
    var limit = step > 0 ? slide._steps[step - 1] : 0;
    slide._fragments.forEach(function (el) {
      var visible = parseInt(el.dataset.step, 10) <= limit;
      el.classList.toggle('is-visible', visible);
      el.classList.toggle('is-current', visible && parseInt(el.dataset.step, 10) === limit);
    });
  }

  function updateHash() {
    var hash = '#/' + (current + 1) + (step > 0 ? '/' + step : '');
    if (location.hash !== hash) {
      try {
        history.replaceState(null, '', hash);
      } catch (e) {
        location.hash = hash;
      }
    }
  }

  function show(index, targetStep) {
    index = Math.max(0, Math.min(total - 1, index));
    var slide = slides[index];
    var steps = slide._steps.length;
    var nextStep = targetStep === 'end' ? steps : Math.max(0, Math.min(steps, targetStep || 0));
    var changed = index !== current;

    if (changed) {
      if (current >= 0) {
        slides[current].classList.remove('is-active');
        slides[current].setAttribute('aria-hidden', 'true');
        slides[current].inert = true;
      }
      slide.classList.add('is-active');
      slide.removeAttribute('aria-hidden');
      slide.inert = false;
      current = index;
      document.title = (index === 0 ? '' : slideTitle(slide) + ' · ') + TALK_TITLE;
      if (status) status.textContent = 'Folie ' + (index + 1) + ' von ' + total + ': ' + slideTitle(slide);
    }

    step = nextStep;
    renderFragments();

    var fraction = total > 1 ? (current + (steps ? step / (steps + 1) : 0)) / (total - 1) : 1;
    if (progressBar) progressBar.style.width = (Math.min(1, fraction) * 100).toFixed(3) + '%';
    if (counter) counter.textContent = (current + 1) + ' / ' + total;
    controls.querySelector('[data-action="prev"]').disabled = current === 0 && step === 0;
    controls.querySelector('[data-action="next"]').disabled =
      current === total - 1 && step === slides[current]._steps.length;
    updateHash();
  }

  function next() {
    if (step < slides[current]._steps.length) show(current, step + 1);
    else if (current < total - 1) show(current + 1, 0);
  }

  function prev() {
    if (step > 0) show(current, step - 1);
    else if (current > 0) show(current - 1, 'end');
  }

  function fromHash() {
    var m = /^#\/(\d+)(?:\/(\d+))?/.exec(location.hash);
    if (!m) return false;
    show(parseInt(m[1], 10) - 1, m[2] ? parseInt(m[2], 10) : 0);
    return true;
  }

  /* ---------- overview ---------- */

  function buildOverview() {
    var grid = overview.querySelector('.overview__grid');
    slides.forEach(function (slide, i) {
      var li = document.createElement('li');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'overview__item';
      button.dataset.index = String(i);
      button.setAttribute('aria-label', 'Folie ' + (i + 1) + ': ' + slideTitle(slide));

      var thumb = document.createElement('span');
      thumb.className = 'overview__thumb';
      var canvas = document.createElement('span');
      canvas.className = 'overview__canvas';
      canvas.inert = true;
      canvas.setAttribute('aria-hidden', 'true');

      var clone = slide.cloneNode(true);
      clone.classList.remove('is-active');
      clone.removeAttribute('aria-hidden');
      clone.removeAttribute('role');
      clone.removeAttribute('aria-label');
      clone.removeAttribute('aria-roledescription');
      clone.inert = false;
      clone.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
      canvas.appendChild(clone);
      thumb.appendChild(canvas);

      var label = document.createElement('span');
      label.className = 'overview__label';
      var num = document.createElement('b');
      num.textContent = String(i + 1);
      label.appendChild(num);
      label.appendChild(document.createTextNode(slideTitle(slide)));

      button.appendChild(thumb);
      button.appendChild(label);
      li.appendChild(button);
      grid.appendChild(li);
    });

    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.overview__item');
      if (!item) return;
      closeOverview(parseInt(item.dataset.index, 10));
    });

    new ResizeObserver(fitThumbs).observe(grid);
    overviewBuilt = true;
  }

  function fitThumbs() {
    var first = overview.querySelector('.overview__thumb');
    if (!first || !first.clientWidth) return;
    overview.style.setProperty('--thumb-scale', String(first.clientWidth / WIDTH));
  }

  function overviewItems() {
    return overview.querySelectorAll('.overview__item');
  }

  function focusOverviewItem(index) {
    var items = overviewItems();
    overviewIndex = Math.max(0, Math.min(items.length - 1, index));
    items[overviewIndex].focus();
    items[overviewIndex].scrollIntoView({ block: 'nearest' });
  }

  function openOverview() {
    if (!overviewBuilt) buildOverview();
    overview.hidden = false;
    document.body.classList.add('is-overview');
    fitThumbs();
    overviewItems().forEach(function (item, i) {
      item.classList.toggle('is-current', i === current);
      if (i === current) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
    focusOverviewItem(current);
  }

  function closeOverview(index) {
    overview.hidden = true;
    document.body.classList.remove('is-overview');
    if (typeof index === 'number' && index !== current) show(index, 0);
  }

  function isOverviewOpen() {
    return !overview.hidden;
  }

  function overviewColumns() {
    var items = overviewItems();
    if (items.length < 2) return 1;
    var top = items[0].getBoundingClientRect().top;
    for (var i = 1; i < items.length; i++) {
      if (items[i].getBoundingClientRect().top > top + 1) return i;
    }
    return items.length;
  }

  /* ---------- fullscreen ---------- */

  function toggleFullscreen() {
    var doc = document;
    var el = doc.documentElement;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(function () {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  function syncFullscreenIcon() {
    var on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    var use = controls.querySelector('[data-action="fullscreen"] use');
    if (use) use.setAttribute('href', on ? '#i-minimize' : '#i-maximize');
  }

  /* ---------- input ---------- */

  function onKeydown(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var target = e.target;
    var tag = target && target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) return;
    var activatesTarget = (e.key === ' ' || e.key === 'Enter') && (tag === 'BUTTON' || tag === 'A');

    if (isOverviewOpen()) {
      var cols = overviewColumns();
      switch (e.key) {
        case 'Escape': case 'o': case 'O': closeOverview(); break;
        case 'ArrowRight': focusOverviewItem(overviewIndex + 1); break;
        case 'ArrowLeft': focusOverviewItem(overviewIndex - 1); break;
        case 'ArrowDown': focusOverviewItem(overviewIndex + cols); break;
        case 'ArrowUp': focusOverviewItem(overviewIndex - cols); break;
        case 'Home': focusOverviewItem(0); break;
        case 'End': focusOverviewItem(total - 1); break;
        default: return;
      }
      e.preventDefault();
      return;
    }

    if (activatesTarget) return;

    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case 'l': case 'j': case 'n':
        next(); break;
      case ' ':
        if (e.shiftKey) prev(); else next();
        break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': case 'h': case 'k': case 'p':
        prev(); break;
      case 'Home': show(0, 0); break;
      case 'End': show(total - 1, 'end'); break;
      case 'o': case 'O': case 'Escape': openOverview(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      default: return;
    }
    e.preventDefault();
  }

  var idleTimer = null;
  function wake() {
    document.body.classList.add('show-controls');
    document.body.classList.remove('hide-cursor');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      document.body.classList.remove('show-controls');
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        document.body.classList.add('hide-cursor');
      }
    }, 2500);
  }

  var touchStart = null;
  function onTouchStart(e) {
    if (isOverviewOpen() || e.touches.length !== 1) return;
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e) {
    if (!touchStart || isOverviewOpen()) return;
    var dx = e.changedTouches[0].clientX - touchStart.x;
    var dy = e.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next(); else prev();
  }

  controls.addEventListener('mousedown', function (e) {
    if (e.target.closest('button')) e.preventDefault();
  });
  controls.addEventListener('click', function (e) {
    var button = e.target.closest('button[data-action]');
    if (!button) return;
    var action = button.dataset.action;
    if (action === 'next') next();
    else if (action === 'prev') prev();
    else if (action === 'overview') openOverview();
    else if (action === 'fullscreen') toggleFullscreen();
  });
  overview.querySelector('[data-action="close-overview"]').addEventListener('click', function () {
    closeOverview();
  });

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('mousemove', wake, { passive: true });
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  document.addEventListener('fullscreenchange', syncFullscreenIcon);
  document.addEventListener('webkitfullscreenchange', syncFullscreenIcon);
  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () {
    if (isOverviewOpen()) closeOverview();
    fromHash();
  });

  slides.forEach(function (slide) {
    slide.setAttribute('aria-hidden', 'true');
    slide.inert = true;
  });
  fit();
  drawLinks();
  window.addEventListener('load', drawLinks);
  if (document.fonts) document.fonts.ready.then(drawLinks);
  if (!fromHash()) show(0, 0);
  document.documentElement.classList.add('is-ready');
})();
