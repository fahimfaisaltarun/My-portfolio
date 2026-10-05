# Project brief

## Who & what

**Fahim Faisal Tarun** — freelance video editor & motion designer.
The site is a portfolio whose job is to win client work: performance ads, UGC edits, podcast /
long-form cuts, motion graphics (After Effects), and SaaS / product videos.

**Primary conversion:** a visitor gets in touch (email / contact form / booking link).
**Secondary:** visitors watch work samples long enough to trust the quality.

## Reference

A competitor portfolio (video editor "Habib Ove") was used as the style reference. What we take
from it — not copy:

- Big, heavy, tightly tracked sans headlines with **one italic serif word** or a **coloured pill**
  for emphasis ("making people *stop* the scroll").
- Giant display words used as section dividers ("Work", "Let's talk").
- Alternating dark and light (cream) bands for rhythm.
- Category-led work showcase: each service has a short pitch, a CTA pill, and a row of thumbnails.
- Smooth, premium motion: scroll-driven reveals, text that scrubs with scroll, pinned sections.

What we change: their accent is blue; ours is **red (ember)** on near-black, with warm bone white.

## Decision log

| Date       | Decision                                                                 | Notes |
| ---------- | ------------------------------------------------------------------------ | ----- |
| 2026-10-05 | Palette **A · Ember noir**: `#0A0A0A` black, `#F4F1EC` bone, `#E8352B` red | Chosen over "Crimson cinema" (deeper `#C8102E`) and "Rouge editorial" (cream-led). Cream is still available as a `data-theme="light"` band. |
| 2026-10-05 | Fonts **Inter Tight** (sans, all UI + headlines) + **Instrument Serif** (italic accent words) | Chosen over Syne + Manrope and Bricolage Grotesque + JetBrains Mono. Both self-hosted via `next/font`. |
| 2026-10-05 | Animation stack: **GSAP 3** (+ ScrollTrigger, SplitText) with **Lenis** smooth scroll | GSAP plugins are free since 3.13. Lenis is driven by the GSAP ticker. |
| 2026-10-05 | SEO-first foundation before any sections                                  | Metadata, JSON-LD (Person, WebSite, ProfessionalService), sitemap, robots, manifest, OG image. |

## Roadmap

- [x] Palette + fonts
- [x] Design tokens, global CSS, utilities
- [x] SEO foundation (metadata, JSON-LD, sitemap, robots, manifest, icons, OG image)
- [x] GSAP + Lenis setup, motion tokens
- [x] Documentation + agent instructions
- [ ] Fill real data in `src/config/site.ts` (domain, socials, final job title)
- [ ] Header / nav (+ mobile menu)
- [ ] Hero (name, role, portrait/showreel, intro animation)
- [ ] "I help brands sell with video like:" — service categories with thumbnail rows
- [ ] Work / case studies (consider `/work/[slug]` pages for long-tail SEO)
- [ ] Testimonials / client logos
- [ ] About ("make time" section)
- [ ] Contact CTA ("Let's make something people finish watching") + footer
- [ ] Custom cursor, magnetic buttons, page transitions
- [ ] Real OG image with photo + brand fonts
- [ ] Analytics (privacy-friendly) + Search Console

## Open questions

- Final domain name?
- Contact method: email only, form (needs a provider), or a booking link (Calendly/Cal.com)?
- Where do videos live: self-hosted MP4/WebM, Mux, Vimeo, or YouTube embeds?
