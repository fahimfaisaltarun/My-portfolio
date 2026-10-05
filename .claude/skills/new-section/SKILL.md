---
name: new-section
description: Build a new homepage/portfolio section (hero, work, services, about, contact, footer…) following this project's structure, tokens, GSAP and SEO rules. Use whenever adding or rebuilding a section.
---

# Build a section

Read only what you need: `docs/design-system.md` (tokens/utilities) and `docs/animation.md`
(GSAP pattern). Don't re-read every doc.

## Files

1. Data → `src/data/<name>.ts`, typed with `src/data/types.ts` (add a type there if new).
2. Section (Server Component) → `src/components/sections/<name>-section.tsx`
   - Named export `<Name>Section`, renders real HTML text from the data.
   - Root: `<section id="<name>" aria-labelledby="<name>-title" className="section-y">`
     wrapping `<div className="container-page">`. Heading `id="<name>-title"`.
   - Light band? add `data-theme="light"` to the `<section>`.
3. Animation (only if needed) → small `"use client"` wrapper in `src/components/motion/`
   (reuse existing ones first: check that folder). Import GSAP from `@/lib/gsap` only.
4. Shared UI (button, pill, video card) → `src/components/ui/`, reuse before creating.
5. Mount it in `src/app/page.tsx` in roadmap order.

## Checklist

- Tokens only (`bg-background`, `text-muted`, `bg-accent`…); `cn()` from `@/lib/utils` for
  conditional classes. No hex values, no Tailwind default colours (they're disabled).
- Heading levels: page has one `h1` (hero); sections use `h2`, cards `h3`.
- Media: `next/image` with `alt` + `sizes`; video `preload="none"`, `poster`, `muted playsInline`
  for autoplay previews.
- Animations: `useGSAP({ scope })`, `gsap.matchMedia()` with a reduced-motion branch,
  `will-reveal` for elements revealed by GSAP.
- Mobile first; check at 375px and desktop in the browser pane, no console errors.
- Run `npm run check` and `npm run build`.
- Tick the item in the roadmap in `docs/project-brief.md`; if you created a reusable motion/ui
  component, add one line for it in `docs/architecture.md`.
