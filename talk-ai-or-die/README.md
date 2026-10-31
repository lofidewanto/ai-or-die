# AI or DIE

Web version of the talk *„AI or DIE“* (Dr. Blasius Lofi Dewanto). Slide content is English.
The slide engine and design come from [`ki-softwareentwicklung`](../ki-softwareentwicklung);
slides 1–20 match the page numbers of the original PDF; after that, each slide number is the PDF page + 3
because slides 21–23 (agent anatomy) were added.

## Usage

| Key | Action |
| --- | --- |
| `→` `↓` `Space` `PageDown` | next step / slide |
| `←` `↑` `Shift+Space` `PageUp` | previous step / slide |
| `Home` / `End` | first / last slide |
| `O` or `Esc` | slide overview (arrow keys + `Enter` to jump) |
| `F` | fullscreen |

## Structure

```
public/                  ← static site (no build step)
  index.html             all slides as <section class="slide">
  assets/css/deck.css    slide engine (same as ki-softwareentwicklung)
  assets/css/theme.css   design tokens and shared layouts (same as ki-softwareentwicklung)
  assets/css/talk.css    layouts of this talk: diagrams, windows, logo tiles, chart
  assets/js/deck.js      slide engine logic (English labels)
tools/                   dev-only deck checks
```

## Local preview

```sh
python3 -m http.server -d public 8000
```

## Checks

```sh
cd tools && npm install && npm run check
```

Third-party licenses: see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
