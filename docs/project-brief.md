# Project brief

## Who & what

**Fahim Faisal Tarun** — Top Rated Upwork freelancer and founder of the **BrandEzzy** agency
(founded 2024, Bangladesh). Services: social media marketing and management, short-form video
(Reels/TikTok/Shorts), content design, Meta/Google ads, websites (WordPress, Wix, Shopify), SEO.
Facts and copy live in `src/data/` — open data questions are in `src/data/README.md`.

**Primary conversion:** a visitor hires Fahim on Upwork (`profile.primaryCta`).
**Secondary:** visitors watch work samples long enough to trust the quality.

## Reference

A competitor portfolio (video editor "Habib Ove") was used as the style reference. What we take
from it — not copy:

- Big, heavy, tightly tracked sans headlines with **one italic serif word** or a **coloured pill**
  for emphasis ("making people _stop_ the scroll").
- Giant display words used as section dividers ("Work", "Let's talk").
- Alternating dark and light (cream) bands for rhythm.
- Category-led work showcase: each service has a short pitch, a CTA pill, and a row of thumbnails.
- Smooth, premium motion: scroll-driven reveals, text that scrubs with scroll, pinned sections.

What we change: their accent is blue; ours is **red (ember)** on near-black, with warm bone white.

## Decision log

| Date       | Decision                                                                                                     | Notes                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-05 | Palette **A · Ember noir**: `#0A0A0A` black, `#F4F1EC` bone, `#E8352B` red                                   | Chosen over "Crimson cinema" (deeper `#C8102E`) and "Rouge editorial" (cream-led). Cream is still available as a `data-theme="light"` band.          |
| 2026-10-05 | Fonts **Inter Tight** (sans, all UI + headlines) + **Instrument Serif** (italic accent words)                | Chosen over Syne + Manrope and Bricolage Grotesque + JetBrains Mono. Both self-hosted via `next/font`.                                               |
| 2026-10-05 | Animation stack: **GSAP 3** (+ ScrollTrigger, SplitText) with **Lenis** smooth scroll                        | GSAP plugins are free since 3.13. Lenis is driven by the GSAP ticker.                                                                                |
| 2026-10-05 | `src/data/` is the single source of truth for content; SEO config derives from it                            | Pre-filled from Upwork profile + agency profile. brandezzy.com template placeholders ignored.                                                        |
| 2026-10-05 | Positioning **founder + marketer**: "Social Media Marketer & Founder of BrandEzzy"                           | Personal brand first, agency as proof of scale.                                                                                                      |
| 2026-10-05 | Primary CTA **Hire me on Upwork**; publish team size **11–50**                                               | Matches Upwork profile so clients see consistent facts.                                                                                              |
| 2026-10-05 | Homepage services: social media, short-form video, websites, paid ads                                        | Others (design, SEO, branding, leads, VA) for a later services page.                                                                                 |
| 2026-10-05 | Canva design boards → `public/images/work/social-media-design/` (20 WebP, renamed)                           | Data in `src/data/design-showcase.ts`; 8 featured. Two source files were mislabelled (Salon = pet care, skin care = makeup).                         |
| 2026-10-05 | Hero: name as h1, promise "Turning scrollers into customers", B&W portrait with ember cast (colour on hover) | Photo's warm pink backdrop clashed with ember noir; grayscale + red light ties it in. A background-removed cutout would allow a bolder layout later. |
| 2026-10-05 | Text on red is pure white; red hover darkens to ember-600                                                    | Owner request. White on ember-500 = 4.2:1 (passes AA for large text).                                                                                |
| 2026-10-05 | Homepage order: Hero → marquee → Services → Work → Process → About → Reviews → footer CTA                    | Nav reordered to match. Copy rule: one strong headline + one short line per section.                                                                 |
| 2026-10-05 | Reviews shows verified proof (counters + Top Rated + Upwork link), no quotes yet                             | No review text available yet; never invent testimonials. Cards render automatically from approved data.                                              |
| 2026-10-05 | SEO-first foundation before any sections                                                                     | Metadata, JSON-LD (Person, WebSite, ProfessionalService), sitemap, robots, manifest, OG image.                                                       |

Added 2026-10-05: tooling + DX setup — `cn()` (clsx + tailwind-merge), `lucide-react`,
`schema-dts`, Prettier + Tailwind plugin, EditorConfig, VS Code settings, `npm run check`,
content model types, Claude skills `new-section` / `new-page`.

## Roadmap

- [x] Palette + fonts
- [x] Design tokens, global CSS, utilities
- [x] SEO foundation (metadata, JSON-LD, sitemap, robots, manifest, icons, OG image)
- [x] GSAP + Lenis setup, motion tokens
- [x] Documentation + agent instructions
- [x] Tooling, DX, content model, agent skills
- [x] Identity data in `src/data/` (positioning, socials, domain fahirum.com)
- [x] First primitives: `PillLink`, `RollText`, `SplitReveal`
- [x] Skills marquee, Services (animated illustrations), Work (cards + lightbox + rows), Process, About, Reviews (proof)
- [x] Header / nav (+ animated mobile menu) and footer (contact CTA, wordmark)
- [x] Hero (name h1, "Turning scrollers into customers", portrait, intro animation)
- [x] Service categories + design showcase rows
- [ ] Case-study pages `/work/[slug]` (needs project descriptions/results)
- [ ] Testimonial quotes (section ready — add approved quotes to `src/data/proof.ts`)
- [x] About (scroll-lit statement, bio, credentials, toolkit)
- [x] Contact CTA + footer (in `SiteFooter`, `#contact`)
- [ ] Custom cursor, magnetic buttons, page transitions
- [ ] Real OG image with photo + brand fonts
- [ ] Analytics (privacy-friendly) + Search Console

## Open questions

- Final domain name?
- Contact method: email only, form (needs a provider), or a booking link (Calendly/Cal.com)?
- Where do videos live: self-hosted MP4/WebM, Mux, Vimeo, or YouTube embeds?
