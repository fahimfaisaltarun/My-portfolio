<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: Fahim Faisal Tarun — portfolio

Personal portfolio for **Fahim Faisal Tarun** — Top Rated Upwork freelancer (social media marketing,
short-form video, web design) and founder of the BrandEzzy agency. Goal: a premium, dark, cinematic
site with smooth GSAP animation that ranks well and converts visitors into client enquiries.

**All content comes from `src/data/` (import from `@/data`).** Never hard-code copy, stats or links.

## Docs — read only the one your task needs

| Task                                  | Read                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------- |
| What's decided / what's next          | [docs/project-brief.md](docs/project-brief.md) (decision log + roadmap) |
| Colours, fonts, type scale, utilities | [docs/design-system.md](docs/design-system.md)                          |
| Any GSAP / scroll animation           | [docs/animation.md](docs/animation.md)                                  |
| New route, metadata, structured data  | [docs/seo.md](docs/seo.md)                                              |
| Where files go, naming, tooling       | [docs/architecture.md](docs/architecture.md)                            |
| Editing content / open data questions | [src/data/README.md](src/data/README.md)                                |

Claude Code skills (load on demand): `new-section`, `new-page` in `.claude/skills/`.

## Stack (already installed — don't reinstall or add alternatives)

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 (CSS-first,
no `tailwind.config.js`) · GSAP 3 + `@gsap/react` (ScrollTrigger, SplitText) · Lenis ·
`clsx` + `tailwind-merge` via `cn()` · `lucide-react` icons · `schema-dts` (typed JSON-LD) ·
Prettier + `prettier-plugin-tailwindcss`.

Deliberately **not** installed yet (add only when the feature is built): contact form stack
(e.g. `zod` + a mail provider), video hosting SDK, analytics, test runner. See
`docs/architecture.md` → "Adding packages".

## Commands

```bash
npm run dev      # dev server on :3000
npm run check    # lint + typecheck + format:check — run before calling work done
npm run build    # production build — must pass too
npm run format   # prettier --write (sorts Tailwind classes)
```

## Key files

`src/config/site.ts` (identity/SEO data) · `src/app/globals.css` (tokens) · `src/lib/seo.ts`
(`createMetadata`, JSON-LD) · `src/lib/gsap.ts` (GSAP import point) · `src/lib/utils.ts` (`cn`)
· `src/data/` (all content).

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
9. Don't add dependencies without a reason in the commit message. Use what's installed first.
10. Keep docs current: if you change a token, convention or decision, update the matching file in
    `docs/` in the same change.

## Not built yet

Portfolio sections (hero, work grid, services, testimonials, about, contact, footer) are **not**
built. `src/app/page.tsx` is a placeholder. See the roadmap in `docs/project-brief.md`.
