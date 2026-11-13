# Atelier design system

Built from the principles in `docs/design-reference.md`, with Atelier's own type, palette and values.
Tokens: `src/app/globals.css` · Primitives: `src/components/ui/`.

## Rules

1. **Monochrome UI.** The only colours are semantic tokens: `background`, `foreground`, `muted`, `surface`, `media`,
   `line`, `line-strong`, `scrim`, `danger`, `success` (+ `white`/`black` for content over photos). Tailwind's default
   palette is removed, so `bg-gray-100` etc. will not exist. Colour comes from photography.
2. **Tones, not dark mode.** `.tone-inverse` (or `<Section tone="inverse">`) flips every semantic token for its children:
   use it for the footer, newsletter band and dark overlays. Components never hard-code black/white text.
3. **Type roles, not raw sizes.** Instrument Sans for everything, Cormorant Garamond (`font-display`) only for the wordmark
   and large editorial statements. Sizes: `text-caption` 11 · `text-ui` 13 · `text-body` 16 · `text-lead` 18 ·
   `text-title` 24→32 (fluid) · `text-display` 36→72 (fluid). Weights: 400 body, 500 headings/prices, 600 labels.
   `eyebrow` = 12px uppercase, 0.14em tracking — section labels and all button text.
4. **Square and flat.** No radius or shadow scale. Only exception: `rounded-full` for circular icon buttons.
5. **Borders are hairlines.** 1px `border-line` for dividers/accordions; `border-line-strong` for selected states
   (swatch, size) and inputs (bottom border only).
6. **Layout.** Breakpoints `sm` 480 · `md` 768 · `lg` 1024 · `xl` 1440. `container-page` (1440 max, gutters 16/32/64 via
   `--gutter`) for content, `container-narrow` (720) for reading and forms, full bleed for media and product grids.
   Vertical rhythm `py-section` = 48/72/96px. `pt-header` offsets content under the 56/72px header.
7. **Links are underlined** (`<TextLink>` / `.link`); the underline fades on hover. Colour is never the link affordance.
8. **Buttons** (`<Button>`, `<ButtonLink>`, `buttonStyles()`): 48px (`md`) or 40px (`sm`), square, `eyebrow` text.
   `primary` (filled) once per view · `secondary` (outline) · `overlay` (white, for use on images) · `ghost` (underlined
   text). Hover inverts fill; 300ms `ease-atelier`.
9. **Product presentation.** `<Grid variant="product">` = 2 → 3 → 4 columns, edge-to-edge, 1px gaps; `gridSpan2` for
   editorial tiles. `<Media ratio>` frames imagery on the `media` ground: `square` packshots, `portrait` on-model,
   `landscape` editorial, `hero` 1:1 → 4:3 → 2:1, `screen` full viewport; `scrim` for white text over photos.
10. **Motion is slow and subtle**: `ease-atelier` with 300ms (hover) to 700ms (drawers); all motion is disabled under
    `prefers-reduced-motion`. Focus is always visible (2px outline in the current foreground).
