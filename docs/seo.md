# SEO

## What's in place

| Piece                | File                                                                                     | Notes                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Site identity        | [`src/config/site.ts`](../src/config/site.ts)                                            | Name, title, description, keywords, socials, URL. **Single source of truth.**            |
| Root metadata        | [`src/app/layout.tsx`](../src/app/layout.tsx)                                            | `metadataBase`, title template `%s — Fahim Faisal Tarun`, OG, Twitter, robots, canonical |
| Viewport             | `layout.tsx` → `export const viewport`                                                   | `themeColor` lives here (not in `metadata`) in Next 16                                   |
| Page metadata helper | [`src/lib/seo.ts`](../src/lib/seo.ts) → `createMetadata()`                               | Canonical, OG, Twitter, optional `noIndex`                                               |
| Structured data      | `src/lib/seo.ts` + [`src/components/seo/json-ld.tsx`](../src/components/seo/json-ld.tsx) | `Person`, `WebSite`, `ProfessionalService`, rendered in root layout, `<` escaped         |
| Sitemap              | [`src/app/sitemap.ts`](../src/app/sitemap.ts)                                            | Add every new public route to `routes` (blog posts are added automatically)              |
| Robots               | [`src/app/robots.ts`](../src/app/robots.ts)                                              | Disallows `/api/` and `/design`                                                          |
| Manifest             | [`src/app/manifest.ts`](../src/app/manifest.ts)                                          | Name, colours, icons                                                                     |
| Icons                | `src/app/icon.svg`, `src/app/apple-icon.tsx`                                             | Generated "F" mark with red dot                                                          |
| OG image             | [`src/app/opengraph-image.tsx`](../src/app/opengraph-image.tsx)                          | 1200×630, generated; used for Twitter too                                                |
| 404                  | [`src/app/not-found.tsx`](../src/app/not-found.tsx)                                      | noindex                                                                                  |
| Security headers     | [`next.config.ts`](../next.config.ts)                                                    | nosniff, frame, referrer, permissions; `x-powered-by` removed                            |

## Adding a page

```tsx
// src/app/work/page.tsx
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Selected work", // → "Selected work — Fahim Faisal Tarun"
  description: "Performance ads, UGC edits and motion graphics for DTC and SaaS brands.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main">
      <h1>Selected work</h1>
      {/* ... */}
    </main>
  );
}
```

Then add `{ path: "/work", changeFrequency: "monthly", priority: 0.8 }` to `sitemap.ts`.

> Next.js merges metadata **shallowly**: a page's `openGraph` replaces the root's entirely.
> `createMetadata()` re-sends images, siteName and locale for this reason — always use it rather
> than writing `openGraph` by hand.

## On-page checklist (every page / section)

- Exactly one `<h1>`; headings in order (`h2` → `h3`), no skipping for styling.
- Landmarks: `<header>`, `<main id="main">`, `<section aria-labelledby>`, `<footer>`.
- Title 50–60 chars, description 140–160 chars, unique per page.
- Text is real HTML (not baked into images/canvas/video). Animated text is still server-rendered.
- Images: `next/image`, descriptive `alt`, explicit sizes, `priority` only for the LCP image.
- Video: `<video preload="none" poster=…>` with captions where possible; consider `VideoObject`
  JSON-LD for case-study pages.
- Internal links use `next/link` with descriptive anchor text (not "click here").
- No layout shift from fonts (handled by `next/font`) or media (always set dimensions).

## Content strategy (for later)

- Target terms: "freelance video editor", "performance ad editor", "UGC video editor",
  "motion graphics designer", "podcast editor", plus niche + "for SaaS / DTC / e-commerce".
- Case-study pages at `/work/[slug]` (client, problem, edit, result, metrics) — these earn long-tail
  traffic far better than a single long homepage. Add `CreativeWork`/`VideoObject` JSON-LD there.
- Testimonials can be marked up as `Review` only if they're genuine and shown on the page.

## Launch checklist

- [x] Production domain fahirum.com set in `src/config/site.ts`
- [x] Socials + `twitterHandle` filled (feed `sameAs` in JSON-LD)
- [ ] Replace generated OG image with a branded one (photo + brand fonts)
- [ ] Add Search Console + Bing verification in `layout.tsx` (`metadata.verification`)
- [ ] Submit `/sitemap.xml` in Search Console
- [ ] Validate with Rich Results Test and validator.schema.org
- [ ] Lighthouse: Performance ≥ 90, SEO = 100, Accessibility ≥ 95 on mobile
- [ ] Remove leftover boilerplate: `src/app/favicon.ico`, `public/*.svg` (Next.js defaults)
