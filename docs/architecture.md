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
├── components/
│   ├── providers/            # Client providers (smooth-scroll)
│   ├── seo/                  # JsonLd
│   ├── sections/             # (planned) Hero, Work, Services, About, Contact…
│   ├── ui/                   # (planned) Button, Pill, Container, VideoCard…
│   └── motion/               # (planned) Reveal, SplitHeading, Magnetic, Cursor…
├── config/
│   └── site.ts               # Site identity + SEO data
└── lib/
    ├── fonts.ts              # next/font definitions
    ├── gsap.ts               # GSAP + plugin registration (client)
    ├── motion.ts             # Motion tokens for GSAP
    └── seo.ts                # createMetadata, JSON-LD builders
docs/                         # Project documentation (this folder)
```

Planned content data (work items, services, testimonials) goes in `src/content/*.ts` as typed
arrays, so sections stay presentational and the data can later move to a CMS.

## Conventions

- **Files:** kebab-case (`smooth-scroll.tsx`); **components:** PascalCase named exports
  (`export function SmoothScroll`). Route files use default exports (Next.js requirement).
- **Imports:** use the `@/` alias (`@/lib/seo`), never long relative paths.
- **Server vs client:** sections are Server Components that render the content; animation lives
  in small `"use client"` wrappers in `components/motion/` that receive children.
- **Styling:** Tailwind utilities with design tokens. Put repeated patterns in `@utility` blocks in
  `globals.css`, not in ad-hoc CSS files. No CSS-in-JS.
- **Props types:** inline `type Props = {…}` above the component; use Next's global
  `PageProps<"/route">` / `LayoutProps<"/route">` helpers for route files.
- **Media:** images in `public/images/…` via `next/image`; videos in `public/videos/…` or an
  external host (decision pending — see project brief).
- **Env:** only `NEXT_PUBLIC_SITE_URL` today. Document any new variable in `.env.example`.

## Definition of done

1. `npm run lint`, `npx tsc --noEmit`, `npm run build` pass.
2. Checked in the browser at desktop and 375px widths; no console errors.
3. Works with `prefers-reduced-motion: reduce` and keyboard-only navigation.
4. SEO checklist in [seo.md](seo.md) satisfied for any new route.
5. Relevant doc in `docs/` updated.
