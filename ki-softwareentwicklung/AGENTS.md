# Slide design spec

Mandatory for all changes and additions in `public/`. Canvas: 1920 × 1080 px. Slide content is German; keep it German.

## 1. Slide types

- **Content slide** (default): light background (`--bg`), `<header class="slide__header">` with `slide__title` (optional `slide__subtitle`), footer added automatically. No custom background colours, gradients or decorative motifs.
- **Chapter slide**: `slide slide--section no-footer` with `data-section-title`, chapter number (`section__num`), title, optional image/logo on the right (`section__content--split` + `section__media`).
- New slide types only after asking the user.

## 2. Colours and type

- Use only the variables from `theme.css`; no new colour values.
- The design follows `talk-itcs-2026-cologne`: `--brand` red is the primary colour, `--text` for headings.
- `--gradient` only for emphasis in titles and chapter numbers; `--orange-strong` only as a diagram accent.
- Product colours only in logos and their immediate surroundings.
- Inter only (`--font`); stick to the existing size steps (title 62 px, body 32–36 px, sources 18 px).

## 3. Layouts

- Reuse existing patterns: figure (`figure`), columns (`cols-2`, `cols-3`), cards (`card`), logo grid, process diagram.
- Equal elements get equal spacing, radii, borders and shadows.
- Content must not overlap the title or the footer.

### Card design (reference: slide 10 "Training von KI-Agenten")

All cards follow one style; don't invent new card variants.

- Markup: `card training__card` with `style="--accent: var(--…)"`; heading as `training__head` (`h3` or `figcaption`).
- Header: full-width coloured band in `--accent`, white text, left-aligned, 32 px, weight 600. No icons in the band.
- Body: white background (no tinted card backgrounds), content centred below the header.
- Optional icon: round `compare__icon training__icon` in `--accent` below the header.
- Accents for side-by-side cards, left to right: `--brand`, `--red-3`, `--bg-inverse` (two cards: `--brand`, `--bg-inverse`).
- Cards in a row have equal height (stretch); images inside are centred with a 1 px `--border` border and 16 px radius.

## 4. Images, logos, diagrams

- Show images in full; no cut-off labels.
- Embed screenshots (e.g. in the `browser` frame), never as slide backgrounds.
- Official logos only (`assets/img/logos/`), scaled proportionally and visually balanced; add the source to `THIRD_PARTY_NOTICES.md`.
- No decoration without a purpose.
- Diagram arrows: clear direction and attachment points, consistent shape and colour within a diagram.
- Icons: Lucide, as `<symbol>` in the sprite in `index.html`; remove unused symbols.

## 5. Reveals

- Use `fragment` only to build up an argument.
- Reveal related items (step, arrow, footnote, source) together via `data-step`.
- Simple image, video or statement slides have no reveals.

## 6. Technical

- No build step, no external dependencies or CDN resources.
- Alt text for meaningful images, `alt=""` for purely decorative ones.
- After changes, run `cd tools && npm install && npm run check` and ask the user for a visual check of the affected slides.
