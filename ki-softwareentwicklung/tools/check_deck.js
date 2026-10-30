// Automated checks for the slide deck (no browser needed).
// Usage: cd tools && npm install && npm run check
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = path.join(__dirname, '..', 'public');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const deckFile = process.argv[2] || 'index.html';
const html = read(deckFile);
const allHtml = fs.readdirSync(root).filter((f) => f.endsWith('.html')).map(read).join('\n');
console.log(`deck: ${deckFile}`);
const js = read('assets/js/deck.js');
const stylesheets = [...html.matchAll(/href="(assets\/css\/[^"#]+\.css)"/g)].map((m) => m[1]);
const css = stylesheets.map(read).join('\n');

let failures = 0;
const check = (cond, msg) => {
  if (!cond) {
    failures++;
    console.log('FAIL:', msg);
  }
};

// ---------- static checks ----------
const doc0 = new JSDOM(html).window.document;
const ids = [...doc0.querySelectorAll('[id]')].map((e) => e.id);
check(ids.every((id, i) => ids.indexOf(id) === i), 'duplicate ids: ' + ids.filter((id, i) => ids.indexOf(id) !== i));

const iconRefs = new Set([
  ...[...html.matchAll(/href="#(i-[a-z0-9-]+)"/g)].map((m) => m[1]),
  ...[...js.matchAll(/'#(i-[a-z0-9-]+)'/g)].map((m) => m[1]),
]);
iconRefs.forEach((r) => check(doc0.getElementById(r), 'missing icon symbol ' + r));
[...doc0.querySelectorAll('symbol[id^="i-"]')].forEach((s) => check(iconRefs.has(s.id), 'unused icon symbol ' + s.id));
// The shared theme also contains markers for layouts used only by index.html.
const markerCss = stylesheets.filter((f) => deckFile === 'index.html' || f !== 'assets/css/theme.css').map(read).join('\n');
[...(html + markerCss).matchAll(/url\(#([a-z-]+)\)/g)].forEach((m) => check(doc0.getElementById(m[1]), 'missing marker ' + m[1]));

// Every local slide link must point to an existing deck and slide.
[...doc0.querySelectorAll('a[href]')].forEach((a) => {
  const href = a.getAttribute('href');
  const match = /^(?:([a-z-]+\.html))?#\/(\d+)(?:\/(\d+))?$/.exec(href);
  if (!match) return;
  const targetFile = match[1] || deckFile;
  const exists = fs.existsSync(path.join(root, targetFile));
  check(exists, 'missing linked deck ' + targetFile);
  if (!exists) return;
  const target = targetFile === deckFile ? doc0 : new JSDOM(read(targetFile)).window.document;
  const count = target.querySelectorAll('.stage > .slide').length;
  check(Number(match[2]) >= 1 && Number(match[2]) <= count, 'invalid slide link ' + href);
});

const assetRefs = [...(html + js).matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]);
assetRefs.forEach((s) => check(fs.existsSync(path.join(root, s)), 'missing file ' + s));
[...css.matchAll(/url\("(\.\.\/[^"]+)"\)/g)].forEach((m) =>
  check(fs.existsSync(path.join(root, 'assets/css', m[1])), 'missing css asset ' + m[1]));

const imgDir = path.join(root, 'assets/img');
const images = fs.readdirSync(imgDir, { recursive: true })
  .map(String)
  .filter((f) => fs.statSync(path.join(imgDir, f)).isFile() && !f.endsWith('.DS_Store'));
images.forEach((f) => {
  const ref = f.split(path.sep).join('/');
  check(allHtml.includes('assets/img/' + ref) || js.includes('assets/img/' + ref) || css.includes('img/' + ref), 'unused image ' + ref);
});
console.log(`static: ${ids.length} ids, ${iconRefs.size} icons, ${assetRefs.length} asset refs, ${images.length} images`);

// ---------- runtime checks ----------
const dom = new JSDOM(html.replace(/<script src="assets\/js\/deck\.js"[^>]*><\/script>/, ''), {
  url: 'https://example.pages.test/deck/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const w = dom.window;
w.HTMLElement.prototype.scrollIntoView = function () {};
w.ResizeObserver = class { observe() {} };
w.document.documentElement.requestFullscreen = () => Promise.resolve();
w.eval(js);

const doc = w.document;
const slides = [...doc.querySelectorAll('.stage > .slide')];
const n = slides.length;
const active = () => slides.findIndex((s) => s.classList.contains('is-active'));
const visible = () => slides[active()].querySelectorAll('.fragment.is-visible').length;
const allFragments = (i) => slides[i].querySelectorAll('.fragment').length;
const key = (k, extra = {}) => doc.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, ...extra }));
const go = (hash) => {
  w.location.hash = hash;
  w.dispatchEvent(new w.HashChangeEvent('hashchange'));
};

check(n > 0, 'no slides');
check(active() === 0 && w.location.hash === '#/1', 'initial state');
check(doc.documentElement.classList.contains('is-ready'), 'is-ready class');
const steps = slides.map((s) => s._steps.length);
console.log(`runtime: ${n} slides, reveals on`, steps.map((k, i) => (k ? `${i + 1}:${k}` : '')).filter(Boolean).join(' '));

// forward walk through every step
let presses = 0;
while (presses < 2000 && !(active() === n - 1 && visible() === allFragments(n - 1))) {
  key('ArrowRight');
  presses++;
}
check(presses === steps.reduce((a, b) => a + b, 0) + n - 1, `forward walk took ${presses} presses`);
key('ArrowRight');
check(active() === n - 1, 'stays on last slide');
check(doc.querySelector('[data-action="next"]').disabled, 'next disabled at end');

// backward walk
while (presses-- > 0) key('ArrowLeft');
check(active() === 0 && visible() === 0, 'backward walk returns to start');

// going back into a slide shows all its fragments; deep links with step
const revealIdx = steps.findIndex((k, i) => k > 0 && i > 0);
if (revealIdx > 0 && revealIdx < n - 1) {
  go('#/' + (revealIdx + 2));
  key('ArrowLeft');
  check(active() === revealIdx && visible() === allFragments(revealIdx), 'back into a slide shows all fragments');
  check(w.location.hash === `#/${revealIdx + 1}/${steps[revealIdx]}`, 'hash includes step: ' + w.location.hash);
  go(`#/${revealIdx + 1}/1`);
  check(active() === revealIdx && visible() > 0, 'deep link with step');
}
go('#/9999');
check(active() === n - 1, 'out-of-range hash clamps to last slide');

key('Home');
key(' ');
check(active() === 1 || visible() > 0, 'space advances');
key('Home');
key('ArrowRight', { metaKey: true });
check(active() === 0 && visible() === 0, 'modifier keys ignored');

// overview
key('o');
const overview = doc.querySelector('.overview');
const items = overview.querySelectorAll('.overview__item');
check(!overview.hidden && items.length === n, 'overview opens with all slides');
check(overview.querySelectorAll('.overview__canvas [id]').length === 0, 'thumbnail clones without ids');
items[n - 1].click();
check(overview.hidden && active() === n - 1, 'thumbnail click opens slide');
key('Escape');
key('Escape');
check(overview.hidden && active() === n - 1, 'Esc toggles overview');

// footers
let section = '';
slides.forEach((s, i) => {
  if (s.dataset.sectionTitle) section = s.dataset.sectionTitle;
  const footer = s.querySelector('.slide-footer');
  if (s.classList.contains('no-footer')) {
    check(!footer, `slide ${i + 1} should have no footer`);
    return;
  }
  check(footer, `slide ${i + 1} missing footer`);
  if (!footer) return;
  check(footer.querySelector('.slide-footer__title').textContent === doc0.title, `slide ${i + 1} deck title`);
  check(footer.querySelector('.slide-footer__page').textContent === String(i + 1), `slide ${i + 1} page number`);
  const label = footer.querySelector('.slide-footer__section');
  check(section ? label && label.textContent === section : !label, `slide ${i + 1} section label`);
});

// accessibility state
check(slides.filter((s) => s.getAttribute('aria-hidden') === 'true').length === n - 1, 'inactive slides aria-hidden');
check(slides.every((s, i) => s.getAttribute('aria-label').startsWith(`${i + 1} von ${n}`)), 'aria-labels');

console.log(failures ? `${failures} FAILURE(S)` : 'all checks passed');
process.exit(failures ? 1 : 0);
