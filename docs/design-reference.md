# Design reference — luxury fashion e-commerce

Visual study of gucci.com (US site, observed 2026-11-11) used as **inspiration for patterns and proportions only**.
Do not copy its wordmark, monogram, brand fonts, imagery, copy, or product names. Atelier Store uses its own
identity built from the tokens below.

## Overall character

- Image-led and editorial: full-bleed photography/video does the selling; the UI recedes.
- Strictly monochrome UI — black, white, and a few neutral greys. Colour comes only from imagery.
- Square corners everywhere (`border-radius: 0`), no shadows, no gradients except dark scrims over images.
- Generous whitespace, small UI text, a single type family with weight doing the hierarchy.
- Slow, smooth motion (≈0.8s, `cubic-bezier(0.5, 0, 0, 1)`).

## Typography

Observed: one custom sans family (weights 100/400/500/700) for all UI; the wordmark is a separate high-contrast serif logo.

| Role | Size / line-height | Weight | Tracking | Case |
|---|---|---|---|---|
| Section heading (e.g. "SERVICES") | 16 / 24px | 700 | -0.03em | UPPERCASE |
| Sub-heading / accordion title / price (PDP) | 16 / 24px | 500 | -0.04em | Sentence |
| Body copy, PDP product name | 16 / 24px | 100–300 (light) | -0.04em | Sentence |
| Large editorial statement (newsletter) | ~32 / 48px | 300–400 | slight negative | Sentence |
| UI small: card title, nav tabs, filters, links | 12 / 16px | 400–500 | -0.03em | Sentence |
| Buttons / CTAs | 12 / 16px | 700 | normal | UPPERCASE |
| Badges ("New", "Pre-launch") | 9 / 12px | 500 | -0.03em | Sentence |
| Footer column headings | 11–12px | 500 | normal | UPPERCASE, grey |
| Drawer menu items | ~20 / 28px | 400 | normal | Sentence |

Atelier substitution: a geometric sans from Google Fonts via `next/font` (e.g. **Jost**, alternatives Outfit / Figtree),
and our own wordmark "ATELIER" in a high-contrast serif (e.g. **Bodoni Moda** or **Cormorant**) with wide letter-spacing.

## Colour

| Token | Value | Use |
|---|---|---|
| `--background` | `#ffffff` | page |
| `--foreground` | `#000000` | text, primary buttons |
| `--surface-muted` | `#f4f4f4` | product image tiles, announcement bar |
| `--border` | `#e7e7e7` | dividers, accordion rules, tab-bar underline |
| `--text-muted` | ~`#757575` | footer headings, inactive tabs |
| `--inverse` | `#000` bg / `#fff` text | footer, newsletter band |
| `--scrim` | `rgba(0,0,0,.4)` | overlays behind drawers, text-on-image legibility |

## Layout & spacing

- Content container ≈ 1200px with **64px side gutters** on desktop (16px on mobile).
- Product grids and hero media are **edge-to-edge** (ignore the container), separated by ~2px gutters.
- Spacing scale is 4/8-based: 8, 12, 16, 24, 32, 48, 64, 96.
- Vertical rhythm between homepage sections: ~24px white gap between full-bleed image blocks; ~96px around text sections.

## Components

**Header** — 72px tall, three zones: left text link with "+" icon; centred serif wordmark; right icon row (bag, account,
search) + hamburger with "MENU" label. Transparent with white content over the hero; becomes solid white with black content
once scrolled (sticky). Optional thin announcement bar (40px, grey) above it with a rotating message and pause control.

**Hero** — full-viewport-height video/image, centered caption (16px/500, white) and a single CTA beneath it, placed in the
lower third. Small pause/mute controls in the bottom corners.

**Buttons** — 48px tall, `padding: 16px 24px`, 12px/700 uppercase, square:
- Primary: black fill, white text (Add to bag is full-width in its column, with a bag icon).
- Secondary: 1px black outline, transparent.
- On imagery: white fill + black text, or 1px white outline + white text over a scrim.

**Editorial split** — two 50/50 full-bleed images side by side, each with centred title + outline CTA near the bottom.

**Navigation drawer** — slides in from the right, 600px wide (full width on mobile), white, round black close button (48px)
top-right; the page behind is blurred/dimmed. Top level is a vertical list of large category links, then smaller secondary
links. Selecting a category pushes a sub-panel with "‹ BACK", a large category title, and a 2-col grid of image tiles
(square image on grey + 12px label).

**Product listing (PLP)**
- Category hero: full-bleed image (~540px), title (16px/500) + one-line intro, bottom-left, white.
- Breadcrumb (12px underlined) → horizontal scrolling sub-category tab bar (active = UPPERCASE 700; others 500) with a
  bottom border and a right chevron.
- Toolbar row: "396 items sorted by **Recommended**" left; "⇄ Filter and sort" right (underlined link, opens drawer).
- Grid: 4 columns desktop (2 on mobile), edge-to-edge, ~2px gaps. Editorial image tiles can span 2 columns within the grid.
- Product card: square image on `#f4f4f4`, product centered with lots of padding; optional 9px badge top-left; below:
  name (12px/400, up to 2 lines) and price (12px/500), 12px inner padding. **Hover swaps to an on-model image** with
  small round prev/next arrows for an image carousel.

**Product detail (PDP)**
- Full-bleed gallery first (~85vh), with a compact thumbnail strip + round prev/next arrows bottom-right.
- Below: 2-column layout. Left: name (16px light), price (16px/500), "Variation: black leather" + square swatch
  thumbnails (selected = 1px black border), then "PRODUCT DESCRIPTION" heading, style number (12px), body copy truncated with
  "+ Read more", then accordions (Product details, Materials & care…) separated by 1px `#e7e7e7` rules with chevrons.
- Right (sticky): full-width primary "ADD TO BAG", then small service lines each with a 16px line icon (delivery estimate,
  contact, find in store, services), and a packaging promo row (thumbnail + uppercase title + 2-line text + "+").

**Newsletter band** — centered uppercase label, a large light-weight 2-line statement, and a "+ Subscribe" text link;
the band transitions to black as it scrolls into the footer.

**Footer** — black background, white text. 3–4 columns: uppercase grey headings, underlined 12px links with ~24px row
spacing; email input as a single bottom-border field with a chevron submit; country selector. Bottom: small legal line,
then an oversized full-width wordmark.

**Forms** — inputs are borderless except a 1px bottom border, 16px text, placeholder in muted grey.

**Icons** — thin (1.5px) outline icons, ~20px, monochrome (bag, user, search, menu, plus, chevrons, phone, pin).

## Interaction & motion

- Drawers/sheets: `transform 0.8s cubic-bezier(0.5, 0, 0, 1)`; backdrop blur + dim.
- Header colour transition on scroll; images fade/scale in subtly as they enter.
- Links: underline as the default affordance (not colour).
- Overlays used for: cookie consent, location prompt, menu, filters, bag — all as right-side drawers (bottom sheets on mobile).

## Responsive behaviour (from the site's stylesheets)

- Breakpoints: **768px** (tablet), **1024px** (desktop — most rules switch here), **1440px** (wide, content capped).
- Side gutters step 16px → 32px (≥768) → 64px (≥1024); content max-width 1440px.
- Product grid: 2 columns below 1024px, 4 columns at ≥1024px; 1px column gaps, no outer padding (edge-to-edge).
- Category hero: square (1:1) on phones, 2:1 at ≥1024px; text overlay capped at ~720px.
- Editorial tiles switch to 16:9 (wide) / 9:16 (tall) at ≥768px; on phones they stack full width.
- Drawers: bottom sheets on phones/tablets, full-height (100dvh) right-side panels at ≥1024px.
- Spacing scale is rem-based: 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96px.
- Neutrals: white page, near-white image ground, 15%-black dividers, 40%-black backdrop; semantic error/success/warning
  colours exist only for form feedback.
