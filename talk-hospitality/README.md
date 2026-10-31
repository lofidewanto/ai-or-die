# Leveraging Open Source Technologies for e-Business in Hospitality Services

Web version of the talk *„Leveraging Open Source Technologies for e-Business in Hospitality Services“* (Dr. Blasius Lofi Dewanto). Slide content is English.
The slide engine and design come from [`talk-ai-or-die`](../talk-ai-or-die); slides with the same content are copied
from there. Slide numbers match the page numbers of the original PDF.

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
  assets/css/deck.css    slide engine (same as talk-ai-or-die)
  assets/css/theme.css   design tokens and shared layouts (same as talk-ai-or-die)
  assets/css/talk.css    layouts of talk-ai-or-die plus the photo and PDF slides of this talk
  assets/js/deck.js      slide engine logic (same as talk-ai-or-die)
  assets/img/slides/     images taken from the PDF
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
