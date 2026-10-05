<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Fahim Faisal Tarun — portfolio

Personal portfolio for a freelance **video editor & motion designer**. Goal: a premium, dark, cinematic
site with smooth GSAP animation that ranks well and converts visitors into client enquiries.

Read before working:

- [docs/project-brief.md](docs/project-brief.md) — goals, references, decisions made so far, roadmap
- [docs/design-system.md](docs/design-system.md) — palette "Ember noir", fonts, type scale, utilities
- [docs/animation.md](docs/animation.md) — GSAP + Lenis rules
- [docs/seo.md](docs/seo.md) — metadata, structured data, launch checklist
- [docs/architecture.md](docs/architecture.md) — folders, conventions, where things go

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-first
config, no `tailwind.config.js`) · GSAP 3 + `@gsap/react` · Lenis smooth scroll.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build — must pass before you call work done
npm run lint    # eslint
npx tsc --noEmit
```

## Hard rules

1. **Server Components by default.** Add `"use client"` only to the smallest leaf that needs it
   (animation, interaction). Never mark a page or layout as a client component.
2. **Design tokens only.** Use semantic Tailwind classes (`bg-background`, `text-foreground`,
   `text-muted`, `bg-accent`, `border-border`) or the raw ramps (`ink-*`, `bone-*`, `ash-*`,
   `ember-*`). Never hard-code hex values in components. Tailwind's default palette is disabled on
   purpose (`--color-*: initial`), so classes like `bg-zinc-900` will silently do nothing.
3. **Red is an accent, not a background.** Keep `ember` under ~10% of any screen: pills,
   highlighted words, CTAs, cursor/dots, hover states.
4. **GSAP imports come from `@/lib/gsap`** — never `import gsap from "gsap"` directly. Use
   `useGSAP()` with a `scope` ref so everything reverts on unmount. No raw `useEffect` tweens.
5. **Respect `prefers-reduced-motion`.** Every animation needs a reduced-motion path
   (use `gsap.matchMedia()`). Content must be readable with JS disabled.
6. **SEO is part of the definition of done.** Every new route: `createMetadata()` from
   `@/lib/seo`, exactly one `<h1>`, semantic landmarks, and an entry in `src/app/sitemap.ts`
   (unless it's noindex). Site identity lives only in `src/config/site.ts`.
7. **Performance budget.** LCP < 2.5s, CLS < 0.1, INP < 200ms. Use `next/image` for images, lazy
   video (`preload="none"` + poster), and `next/font` only — no `<link>` to Google Fonts.
8. **Accessibility.** Visible focus states (already global), alt text on all media, `aria-hidden`
   on decorative elements, colour contrast AA minimum (`muted` on `background` passes for
   ≥14px text; use `foreground` for small body copy).
9. Don't add dependencies without a reason written in the PR/commit. Prefer what's here.
10. Keep docs current: if you change a token, convention or decision, update the matching file in
    `docs/` in the same change.

## Not built yet

Portfolio sections (hero, work grid, services, testimonials, about, contact, footer) are **not**
built. `src/app/page.tsx` is a placeholder. See the roadmap in `docs/project-brief.md`.
