# Architecture & conventions

## Folder structure

```
src/
├── app/                      # Routes (App Router) + metadata file conventions
│   ├── layout.tsx            # Root: fonts, metadata, viewport, JSON-LD, skip link, Lenis
│   ├── page.tsx              # Home (placeholder until sections are built)
│   ├── globals.css           # Design tokens + Tailwind theme + base + utilities
│   ├── not-found.tsx
│   ├── design/page.tsx       # Internal token preview (noindex)
│   ├── robots.ts · sitemap.ts · manifest.ts
│   ├── icon.svg · apple-icon.tsx · opengraph-image.tsx
│   ├── blog/                 # /blog index + [slug] post pages (+ per-post opengraph-image)
├── components/
│   ├── layout/               # SiteHeader, SiteFooter, MobileMenu, NavLink, HeaderShell, BackToTop
│   ├── providers/            # Client providers (smooth-scroll)
│   ├── seo/                  # JsonLd
│   ├── sections/             # Hero, MarqueeBand, Services, Work (+ WorkGallery), Process, About, Reviews, Testimonials, Blog
│   ├── illustrations/        # Line-art SVG service illustrations (animated by DrawOnScroll)
│   ├── ui/                   # PillLink, RollText, Logo, Availability, BlogCard (planned: VideoCard…)
│   └── motion/               # SplitReveal, HeroMotion, Reveal, Marquee, Counter, DrawOnScroll, ScrubWords, Parallax, ScrollLine
├── content/blog/             # Blog post bodies (<slug>.mdx); metadata is in src/data/blog.ts
├── mdx-components.tsx        # Styles for MDX elements in posts (+ <Figure>)
├── config/
│   └── site.ts               # SEO config, derived from src/data
├── data/                     # ★ Source of truth for ALL site content (see src/data/README.md)
│   ├── index.ts              # Barrel — import everything from "@/data"
│   ├── types.ts              # Content model
│   ├── profile.ts · agency.ts · services.ts · proof.ts
└── lib/
    ├── fonts.ts              # next/font definitions
    ├── gsap.ts               # GSAP + plugin registration (client)
    ├── motion.ts             # Motion tokens for GSAP
    ├── blog.ts               # Server-only: getPosts, getPost, reading time, loadPostBody
    ├── seo.ts                # createMetadata, typed JSON-LD builders
    └── utils.ts              # cn() = clsx + tailwind-merge (knows our custom tokens)
docs/                         # Project documentation (this folder)
.claude/                      # Claude Code: skills (new-section, new-page), permissions
.vscode/                      # Recommended extensions + format-on-save
```

All content (profile, agency, services, work, stats, testimonials) lives in `src/data/` as typed
objects/arrays, imported via `@/data`. Components never hard-code copy, numbers or links, so the
data can later move to a CMS without touching components.

## Reusable components (registry)

Add one line here whenever you create a shared component, so the next person reuses it.

| Component             | Path                                                     | Purpose                                                                    |
| --------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| `SiteHeader`          | `src/components/layout/site-header.tsx`                  | Fixed header: logo, desktop nav (lg+), CTA, mobile menu. In root layout.   |
| `HeaderShell`         | `src/components/layout/header-shell.tsx`                 | Hide-on-scroll-down / blur-on-scroll via `data-*` attrs (no re-renders)    |
| `MobileMenu`          | `src/components/layout/mobile-menu.tsx`                  | Native `<dialog>` full-screen menu + GSAP wipe/stagger; Esc, focus, Lenis  |
| `NavLink`             | `src/components/layout/nav-link.tsx`                     | Link that Lenis-scrolls to same-page `#sections`, `aria-current` on routes |
| `SiteFooter`          | `src/components/layout/site-footer.tsx`                  | `#contact` CTA, link columns, giant wordmark, legal bar. In root layout.   |
| `BackToTop`           | `src/components/layout/back-to-top.tsx`                  | Smooth scroll to top + focus `#main`                                       |
| `GoogleTag`           | `src/components/analytics/google-tag.tsx`                | gtag.js (Ads + GA4), Consent Mode v2 defaults. Root layout, live site only |
| `ConversionTracker`   | `src/components/analytics/conversion-tracker.tsx`        | Delegated click listener: Upwork + mailto links → Ads conversion + GA4     |
| `ConsentBanner`       | `src/components/analytics/consent-banner.tsx`            | Accept/Reject card; `CookieSettingsButton` in footer re-opens it           |
| `PillLink`            | `src/components/ui/pill-link.tsx`                        | Primary/outline pill CTA with arrow chip; external → new tab               |
| `RollText`            | `src/components/ui/roll-text.tsx`                        | CSS hover text roll (needs a `group` parent)                               |
| `Logo`                | `src/components/ui/logo.tsx`                             | Wordmark + ember dot, links home                                           |
| `Availability`        | `src/components/ui/availability.tsx`                     | Pulsing dot + `profile.availability`                                       |
| `SplitReveal`         | `src/components/motion/split-reveal.tsx`                 | SplitText masked lines/words/chars reveal; `scrub` option                  |
| `HeroSection`         | `src/components/sections/hero-section.tsx`               | Promise headline, laptop editor → phone "studio" scene, name h1, CTAs      |
| `HeroMotion`          | `src/components/motion/hero-motion.tsx`                  | Hero intro, continuous editor/reel loops, scroll depth, pointer tilt       |
| `SiteIntro`           | `src/components/layout/site-intro.tsx`                   | First-visit intro overlay + inline flag script (homepage)                  |
| `IntroMotion`         | `src/components/motion/intro-motion.tsx`                 | Intro timeline, load hold, skip, hand-over to the hero (`@/lib/intro`)     |
| `SectionHeading`      | `src/components/ui/section-heading.tsx`                  | "(01) Eyebrow" + h2 with accent word + intro; `align="split"`              |
| `Reveal`              | `src/components/motion/reveal.tsx`                       | Fade-up for descendants marked `data-reveal` (+ `will-reveal`), batched    |
| `Marquee`             | `src/components/motion/marquee.tsx`                      | Infinite loop strip; speeds up with scroll velocity; pauses off-screen     |
| `Counter`             | `src/components/motion/counter.tsx`                      | Count-up number (final value server-rendered)                              |
| `DrawOnScroll`        | `src/components/motion/draw-on-scroll.tsx`               | Draws SVG `data-draw` strokes, pops `data-pop`, idles `data-float/pulse`   |
| `ScrubWords`          | `src/components/motion/scrub-words.tsx`                  | Statement text lit word-by-word with scroll                                |
| `Parallax`            | `src/components/motion/parallax.tsx`                     | Scroll-linked x/y travel (giant background words)                          |
| `ScrollLine`          | `src/components/motion/scroll-line.tsx`                  | Accent progress line that fills through its parent                         |
| `WorkGallery`         | `src/components/sections/work-gallery.tsx`               | Showcase cards + native-dialog lightbox (arrows, Esc)                      |
| `ServiceIllustration` | `src/components/illustrations/service-illustrations.tsx` | Line-art SVG per featured service                                          |
| `withEmphasis`        | `src/lib/text.tsx`                                       | Wrap a word of a headline in the accent serif style                        |
| `JsonLd`              | `src/components/seo/json-ld.tsx`                         | Render typed schema.org data                                               |
| `SmoothScroll`        | `src/components/providers/smooth-scroll.tsx`             | Lenis + GSAP ticker; exports `getLenis()`, `scrollToTarget()`              |
| `BlogCard`            | `src/components/ui/blog-card.tsx`                        | Post preview card (cover or typographic fallback, stretched title link)    |

Every page renders `<main id="main" tabIndex={-1} className="outline-none">` (skip-link and
back-to-top target). The header is fixed, so a page's first section needs
`pt-[var(--header-height)]` (or more).

## Conventions

- **Files:** kebab-case (`smooth-scroll.tsx`); **components:** PascalCase named exports
  (`export function SmoothScroll`). Route files use default exports (Next.js requirement).
- **Imports:** use the `@/` alias (`@/lib/seo`), never long relative paths.
- **Server vs client:** sections are Server Components that render the content; animation lives
  in small `"use client"` wrappers in `components/motion/` that receive children. A `"use client"`
  file should export **components only** — any other value (a class string, a constant) imported
  from it into a Server Component arrives as a client reference, not the value.
- **Styling:** Tailwind utilities with design tokens. Put repeated patterns in `@utility` blocks in
  `globals.css`, not in ad-hoc CSS files. No CSS-in-JS.
- **Props types:** inline `type Props = {…}` above the component; use Next's global
  `PageProps<"/route">` / `LayoutProps<"/route">` helpers for route files.
- **Media:** files in `public/images/<area>/<topic>/` (e.g. `work/social-media-design/`),
  kebab-case keyword names, always rendered with `next/image` using `width`/`height`/`alt` from
  `src/data`. Videos: `public/videos/` or an external host (pending). See `src/data/README.md`.
- **Env:** only `NEXT_PUBLIC_SITE_URL` today. Document any new variable in `.env.example`.

## Tooling

| Tool         | Config                              | Notes                                                                                         |
| ------------ | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Prettier     | `.prettierrc.json`                  | 100 cols, double quotes, trailing commas. Tailwind plugin sorts classes (also inside `cn()`). |
| ESLint       | `eslint.config.mjs`                 | `eslint-config-next` (core web vitals + TS)                                                   |
| TypeScript   | `tsconfig.json`                     | strict, `@/*` → `src/*`                                                                       |
| EditorConfig | `.editorconfig`                     | LF, 2 spaces                                                                                  |
| Node         | `.nvmrc` (22 LTS), `engines` ≥ 20.9 |                                                                                               |
| VS Code      | `.vscode/`                          | Recommended extensions, format on save, Tailwind IntelliSense in `cn()`                       |

`npm run check` = lint + typecheck + format check. Run it plus `npm run build` before committing.

## Adding packages

Installed and expected: see the Stack list in `AGENTS.md`. Before adding anything, check it's not
already covered. Planned additions, installed only when the feature is built:

| Feature       | Likely package(s)                       | Why not yet                                        |
| ------------- | --------------------------------------- | -------------------------------------------------- |
| Contact form  | `zod` (+ `resend` or a form service)    | Contact method not decided                         |
| Video hosting | `@mux/mux-player-react` or `next-video` | Hosting not decided; plain `<video>` works for now |
| Analytics     | `@vercel/speed-insights` (optional)     | Google Ads + GA4 use plain gtag.js, no package     |
| E2E tests     | `@playwright/test`                      | Worth it once there are interactive flows          |

Installed for the blog: `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-gfm`
(posts as MDX files; plugins are passed by name for Turbopack). `src/content/` is in
`.prettierignore` because Prettier only understands MDX v1.

Never add a second animation library (Framer Motion, AOS…), icon set, or CSS framework.

## Definition of done

1. `npm run check` and `npm run build` pass.
2. Checked in the browser at desktop and 375px widths; no console errors.
3. Works with `prefers-reduced-motion: reduce` and keyboard-only navigation.
4. SEO checklist in [seo.md](seo.md) satisfied for any new route.
5. Relevant doc in `docs/` updated.
