# KI in der Softwareentwicklung

Web version of the talk *„KI in der Softwareentwicklung – Von GitHub Copilot bis zu
LLM-basierten Anwendungen“* (Dr. Blasius Lofi Dewanto). The design follows
[`talk-itcs-2026-cologne`](../talk-itcs-2026-cologne).

## Decks

- `public/index.html` – Workshop: KI in der Softwareentwicklung
- `public/security.html` – Security: KI-Agenten für die Softwareentwicklung

## Usage

| Key | Action |
| --- | --- |
| `→` `↓` `Space` `PageDown` | next step / slide |
| `←` `↑` `Shift+Space` `PageUp` | previous step / slide |
| `Home` / `End` | first / last slide |
| `O` or `Esc` | slide overview (arrow keys + `Enter` to jump) |
| `F` | fullscreen |

Swiping works on touch devices; the controls in the bottom-right corner appear on
mouse movement. Every slide has its own URL (`#/12`, with reveal step `#/12/2`).

## Structure

```
public/                  ← static site (no build step)
  index.html             all slides as <section class="slide">
  security.html          separate Security deck; links to shared Workshop content
  assets/css/deck.css    slide engine: scaling, navigation, overview, reveals
  assets/css/theme.css   design tokens and slide layouts (canvas 1920 × 1080 px)
  assets/css/security.css scoped Security layouts using the existing theme
  assets/js/deck.js      slide engine logic
  assets/img/            slide images (WebP)
  assets/fonts/          Inter (self-hosted, SIL OFL 1.1)
logo-sources/            source files for product logos
tools/sources/           source image for microsoft-365-apps.webp
```

## Editing slides

Each slide is a `<section class="slide">` in `public/index.html`:

- `data-title` – title used in the overview and browser tab
- `data-section-title` – starts a new section (shown in the footer of the following slides)
- `class="no-footer"` – hides the footer
- `class="fragment"` – element appears step by step; `data-step="2"` groups
  elements into the same step (default: document order)

## Local preview

```sh
python3 -m http.server -d public 8000
# open http://localhost:8000
```

## Checks

```sh
cd tools && npm install && npm run check
```

Runs `check_deck.js` for both decks (navigation, reveals, footers, local slide
links, missing/unused files) and `html-validate` for all HTML entry points.

Third-party licenses: see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
