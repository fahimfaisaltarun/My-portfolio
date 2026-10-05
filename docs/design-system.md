# Design system — "Ember noir"

All tokens live in [`src/app/globals.css`](../src/app/globals.css). Preview them at
[`/design`](http://localhost:3000/design) (noindex, internal).

## Colour

### Raw ramps

| Token       | Hex       | Use                                         |
| ----------- | --------- | ------------------------------------------- |
| `ink-950`   | `#0A0A0A` | Page background                             |
| `ink-900`   | `#111110` | Alternate dark band                         |
| `ink-850`   | `#161514` | Cards, surfaces                             |
| `ink-800`   | `#1F1E1C` | Raised / hover surface                      |
| `ink-700`   | `#2A2826` | Hairline borders                            |
| `ink-600`   | `#3A3835` | Strong borders                              |
| `bone-50`   | `#F4F1EC` | Primary text on dark; light-band background |
| `bone-100`  | `#E8E4DD` | Light-band surface                          |
| `bone-200`  | `#D6D1C9` | Light-band borders                          |
| `ash-400`   | `#8C8782` | Muted text on dark                          |
| `ash-500`   | `#6B6763` | Muted text on light / subtle on dark        |
| `ember-300` | `#FF7A6E` | Soft red (glows, gradients — sparingly)     |
| `ember-400` | `#FF5446` | Accent hover, focus ring                    |
| `ember-500` | `#E8352B` | **Brand accent**                            |
| `ember-600` | `#C42419` | Pressed state                               |
| `ember-700` | `#9E1B13` | Deep red (shadows, dark gradients)          |

### Semantic roles — use these first

| Class (bg-/text-/border-) | Dark (default) | Light (`data-theme="light"`) |
| ------------------------- | -------------- | ---------------------------- |
| `background`              | ink-950        | bone-50                      |
| `surface`                 | ink-850        | bone-100                     |
| `surface-raised`          | ink-800        | bone-200                     |
| `foreground`              | bone-50        | ink-950                      |
| `muted`                   | ash-400        | ash-500                      |
| `subtle`                  | ash-500        | ash-400                      |
| `border`                  | ink-700        | bone-200                     |
| `border-strong`           | ink-600        | ash-400                      |
| `accent`                  | ember-500      | ember-500                    |
| `accent-hover`            | ember-600      | ember-600                    |
| `accent-foreground`       | `#FFFFFF`      | `#FFFFFF`                    |

Add `data-theme="light"` to any `<section>` to flip it to the cream "paper" look — every
semantic class inside updates automatically.

### Rules

- Red ≤ ~10% of a screen. It's for: highlighted words, pills, primary CTAs, dots, hover lines.
- Never pure `#FFFFFF` or `#000000` — bone and ink are warmer and read as premium. **Exception:**
  text on red (`accent-foreground`) is pure white — 4.2:1 on ember-500 vs 3.75:1 for bone.
  Red hovers go _darker_ (ember-600, 5.8:1), never lighter, so white text stays legible.
- Body copy smaller than 14px uses `text-foreground`, not `text-muted` (contrast).
- Tailwind's default colours are disabled (`--color-*: initial`). Only the tokens above exist.

## Typography

| Role         | Font                                   | Weight  | Notes                                 |
| ------------ | -------------------------------------- | ------- | ------------------------------------- |
| Headlines    | Inter Tight (`font-sans`)              | 700–800 | `tracking-display` / `tracking-tight` |
| Body / UI    | Inter Tight (`font-sans`)              | 400–500 | 16px base, 1.6 line height            |
| Accent words | Instrument Serif (`font-serif`) italic | 400     | Use the `accent-serif` utility        |
| Labels       | Inter Tight                            | 500     | `label` utility (uppercase, tracked)  |

Fonts load via `next/font/google` in [`src/lib/fonts.ts`](../src/lib/fonts.ts) — self-hosted, no
layout shift, no requests to Google.

### Fluid type scale

| Class          | Size                                      | Line height |
| -------------- | ----------------------------------------- | ----------- |
| `text-display` | `clamp(4.5rem, 1rem + 14vw, 16rem)`       | 0.85        |
| `text-h1`      | `clamp(3rem, 1.5rem + 6vw, 8rem)`         | 0.92        |
| `text-h2`      | `clamp(2.25rem, 1.5rem + 3vw, 4.5rem)`    | 1           |
| `text-h3`      | `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)`  | 1.1         |
| `text-lead`    | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` | 1.5         |
| `text-body`    | `1rem`                                    | 1.6         |
| `text-small`   | `0.875rem`                                | 1.5         |
| `text-caption` | `0.75rem`                                 | 1.4         |

Tracking: `tracking-display` (−0.05em), `tracking-tight` (−0.035em), `tracking-snug`
(−0.015em), `tracking-label` (0.08em).

## Custom utilities

| Utility          | What it does                                                            |
| ---------------- | ----------------------------------------------------------------------- |
| `container-page` | Max 100rem, centred, fluid side gutter (`--gutter`)                     |
| `section-y`      | Fluid vertical section padding (5rem → 11rem)                           |
| `label`          | Small uppercase tracked muted label                                     |
| `accent-serif`   | Instrument Serif italic for emphasis words                              |
| `pill-accent`    | Red rounded pill behind a word                                          |
| `will-reveal`    | Hidden until GSAP reveals it (auto-visible without JS / reduced motion) |

### Signature headline pattern

```tsx
<h2 className="text-h2 font-extrabold tracking-display">
  Making people <span className="pill-accent accent-serif">stop</span> the scroll and{" "}
  <span className="accent-serif text-accent">watch</span>
</h2>
```

## Spacing, radius, layout

- Gutter: `--gutter` = `clamp(1rem, 0.5rem + 2vw, 2.5rem)` (16px on phones).
- Radii: pills `rounded-full`, cards `rounded-2xl`, large media `rounded-3xl`.
- Header height token: `--header-height` (4.5rem) — also used for `scroll-padding-top`.
- Breakpoints: Tailwind defaults plus `3xl` (1920px).

## Motion tokens

CSS: `--ease-out-expo`, `--ease-in-out-quart`, `--duration-fast|base|slow`.
GSAP mirror: [`src/lib/motion.ts`](../src/lib/motion.ts). See [animation.md](animation.md).
