# The TOE Framework

Web version of the talk *„The TOE Framework: Technology · Organization · Environment“* (Dr. Blasius Lofi Dewanto),
a management lens for adopting AI in a company. Slide content is English.
The content is industry-neutral and applies to any business.
The slide engine and design come from [`talk-ai-or-die`](../talk-ai-or-die).

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
  assets/css/talk.css    layouts of talk-ai-or-die plus the TOE title and dimension slides
  assets/js/deck.js      slide engine logic (same as talk-ai-or-die)
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
