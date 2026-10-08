# `src/data` — content source of truth

Every word, number, link and media reference on the site comes from here. Components import from
`@/data`; SEO config (`src/config/site.ts`) and JSON-LD (`src/lib/seo.ts`) derive from it too.

| File                 | Holds                                                               |
| -------------------- | ------------------------------------------------------------------- |
| `profile.ts`         | Name, headline, summary, bio, location, email, socials, intro video |
| `agency.ts`          | BrandEzzy details                                                   |
| `services.ts`        | Services (with `featured` flag), industries, platforms, tools       |
| `proof.ts`           | Stats, badges, work items, testimonials, education/certifications   |
| `design-showcase.ts` | 20 social media design boards (Canva) with image paths + alt text   |
| `blog.ts`            | Blog post metadata (title, excerpt, date, cover, status) + copy     |
| `navigation.ts`      | Main nav items and footer CTA copy                                  |
| `types.ts`           | Types for all of the above                                          |
| `index.ts`           | Barrel + helpers (`publishedWork`, `approvedTestimonials`)          |

## Rules

- **Only verified facts.** Every stat has a `source`. Re-check Upwork numbers before launch.
- Work items stay `status: "draft"` until they have media + summary; drafts never render.
- Testimonials must be real client quotes with `approved: true` before they render.
- Media files live in `public/` (see "Media layout" below) and are referenced from data only.
- Every image needs `alt`, `width` and `height` in data (prevents layout shift, helps SEO).
- Blog posts: body in `src/content/blog/<slug>.mdx`, metadata in `blog.ts` with the same slug.
  `status: "draft"` shows only in `npm run dev`; switch to `"published"` to go live. Covers go in
  `public/images/blog/<slug>.webp` (1600×900). `example-post` (draft) shows every formatting option; `<HireMe />` adds the Upwork button; add `wide`
  to a `<Figure>` for detailed images (infographics): wider on desktop, tap-to-open on phones.
  Until a post is published, the Blog nav link is hidden and `/blog` is noindex + out of the sitemap.
- Search `TODO(owner)` for everything still waiting on the owner.

## Media layout

```
public/
├── images/
│   └── work/
│       └── social-media-design/   # <industry>-social-media-design.webp (1000×750, Canva)
└── videos/                        # (planned) reels: <client-or-industry>-reel.mp4 + poster
```

Naming: lowercase kebab-case, descriptive keywords first (`dental-social-media-design.webp`), no
spaces or numbers-only names. Images are pre-compressed WebP — don't re-commit originals. New
media → add the file, then its entry in the matching data file.

## Open questions (owner)

Track answers here; remove each line once the data file is updated.

Decided 2026-10-05: positioning "founder + marketer", team size 11–50, primary CTA = Upwork,
featured services = social, short-form video, websites, paid ads.

Decided 2026-10-05: domain fahirum.com; socials added; owner has permission from all clients to
use their names, work and reviews; no agency-level stats.

1. Reels / short-form video files (none in the Canva deck)
2. Own-words bio
