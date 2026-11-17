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

| Date       | Decision                                                                                                                                                                          | Notes                                                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-05 | Palette **A · Ember noir**: `#0A0A0A` black, `#F4F1EC` bone, `#E8352B` red                                                                                                        | Chosen over "Crimson cinema" (deeper `#C8102E`) and "Rouge editorial" (cream-led). Cream is still available as a `data-theme="light"` band.                                              |
| 2026-10-05 | Fonts **Inter Tight** (sans, all UI + headlines) + **Instrument Serif** (italic accent words)                                                                                     | Chosen over Syne + Manrope and Bricolage Grotesque + JetBrains Mono. Both self-hosted via `next/font`.                                                                                   |
| 2026-10-05 | Animation stack: **GSAP 3** (+ ScrollTrigger, SplitText) with **Lenis** smooth scroll                                                                                             | GSAP plugins are free since 3.13. Lenis is driven by the GSAP ticker.                                                                                                                    |
| 2026-10-05 | `src/data/` is the single source of truth for content; SEO config derives from it                                                                                                 | Pre-filled from Upwork profile + agency profile. brandezzy.com template placeholders ignored.                                                                                            |
| 2026-10-05 | Positioning **founder + marketer**: "Social Media Marketer & Founder of BrandEzzy"                                                                                                | Personal brand first, agency as proof of scale.                                                                                                                                          |
| 2026-10-05 | Primary CTA **Hire me on Upwork**; publish team size **11–50**                                                                                                                    | Matches Upwork profile so clients see consistent facts.                                                                                                                                  |
| 2026-10-05 | Homepage services: social media, short-form video, websites, paid ads                                                                                                             | Others (design, SEO, branding, leads, VA) for a later services page.                                                                                                                     |
| 2026-10-05 | Canva design boards → `public/images/work/social-media-design/` (20 WebP, renamed)                                                                                                | Data in `src/data/design-showcase.ts`; 8 featured. Two source files were mislabelled (Salon = pet care, skin care = makeup).                                                             |
| 2026-10-05 | Hero: name as h1, promise "Turning scrollers into customers", B&W portrait with ember cast (colour on hover)                                                                      | Photo's warm pink backdrop clashed with ember noir; grayscale + red light ties it in. A background-removed cutout would allow a bolder layout later.                                     |
| 2026-10-05 | Text on red is pure white; red hover darkens to ember-600                                                                                                                         | Owner request. White on ember-500 = 4.2:1 (passes AA for large text).                                                                                                                    |
| 2026-10-05 | Homepage order: Hero → marquee → Services → Work → Process → About → Reviews → footer CTA                                                                                         | Nav reordered to match. Copy rule: one strong headline + one short line per section.                                                                                                     |
| 2026-10-05 | Reviews shows verified proof (counters + Top Rated + Upwork link), no quotes yet                                                                                                  | No review text available yet; never invent testimonials. Cards render automatically from approved data.                                                                                  |
| 2026-10-06 | Added 12 verbatim Upwork reviews; 5.0 rating now shown (verified)                                                                                                                 | Unnamed clients are labelled by industry. Hourly rates / per-contract earnings are never published.                                                                                      |
| 2026-10-06 | Testimonials: three GSAP scrolling columns after Proof (owner request, modelled on a 21st.dev component)                                                                          | Built with GSAP, not `motion`, to keep one animation library. No schema.org Review markup: Google ignores self-serving reviews on your own site.                                         |
| 2026-10-07 | Blog: MDX posts (`src/content/blog/`) + `/blog`, `/blog/[slug]`; latest 3 as cards last on the homepage                                                                           | Owner request. Metadata in `src/data/blog.ts`; drafts dev-only. BlogPosting JSON-LD, per-post OG image.                                                                                  |
| 2026-10-05 | SEO-first foundation before any sections                                                                                                                                          | Metadata, JSON-LD (Person, WebSite, ProfessionalService), sitemap, robots, manifest, OG image.                                                                                           |
| 2026-10-10 | Domain **tarunfahim.com** (first live domain)                                                                                                                                     | Earlier "fahirum.com" was a placeholder, never live. Set in `src/config/site.ts`; canonical URLs, sitemap, robots, OG and JSON-LD all derive from it.                                    |
| 2026-10-10 | Tracking: **Google Ads + GA4** via one gtag.js, Consent Mode v2 + cookie banner (EU/UK)                                                                                           | Conversions: Upwork link clicks + mailto clicks (one delegated listener). IDs in `siteConfig.analytics`; live site only.                                                                 |
| 2026-10-10 | Hero redesigned as **"Studio"**: four-line promise, laptop video editor publishing to a phone, name h1 + CTAs below                                                               | Owner picked it from 15 canvas explorations (option E3). Continuous GSAP loops (playhead, waveform, reel stories) pause off screen. Portrait still needs a cutout.                       |
| 2026-11-12 | Contact section gets a **contact form** (Resend via Server Action) + **"Book a free call"** Calendly button                                                                       | Owner request. Calendly opens in a new tab (no embed script); button hidden until the link is set in `profile.bookingCta`. Form: name, email, service, message; honeypot + per-IP limit. |
| 2026-11-15 | Tracking: **Meta Pixel** added for Meta Ads, next to Google Ads + GA4                                                                                                             | Owner request. Same cookie banner (consent revoke/grant). Events: Lead (form), Contact (Upwork/email clicks), Schedule (Calendly). No Conversions API yet.                               |
| 2026-11-15 | **"Book a free call"** (Calendly 30 min) also in the hero, between "See my work" and "Hire me on Upwork"                                                                          | Owner request. Link set in `profile.bookingCta`; outline style so Upwork stays the main CTA.                                                                                             |
| 2026-11-15 | "Book a free call" also in the **header** (outline, left of Upwork, sm+) and the mobile menu                                                                                      | Owner request. Upwork stays the red primary CTA everywhere.                                                                                                                              |
| 2026-11-17 | Tracking: **Google Tag Manager** container added next to gtag.js (Ads + GA4)                                                                                                      | Owner request. Same consent defaults (set before GTM loads); no `<noscript>` iframe. Lead events also pushed to the dataLayer. GA4 lives in code OR in GTM, never both.                  |
| 2026-11-17 | **Google Ads** account (USD, Bangladesh time), no campaign yet; 4 conversions: form, Calendly, Upwork, email                                                                      | Owner request. Labels in `siteConfig.analytics`; GA4 linked. Enhanced conversions left **off** (would send hashed form emails; not covered by the cookie notice).                        |
| 2026-11-17 | Tracking audit fixes: GA4 event retention **14 months**, **Search Console linked to GA4**, YouTube goals in Google Ads set to **secondary**, all 4 lead conversions count **One** | Owner request after audit. Keeps campaign bidding focused on enquiries; search queries now visible in GA4.                                                                               |
| 2026-11-17 | **Meta**: new "Fahim Faisal Tarun" business portfolio (kept apart from client/BrandEzzy portfolios) with Pixel + ad account (USD, Dhaka); domain verified by meta tag             | Owner request. Conversions API left off (browser pixel only, behind the cookie banner).                                                                                                  |
| 2026-10-10 | First-visit intro: viewfinder + "Fahim." wordmark, rolling services, 000→100 counter, wipe into the hero                                                                          | Owner request. Homepage only, once per session, skippable; off for reduced motion. Hero headline stays painted underneath so LCP is unaffected.                                          |

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
- [x] Identity data in `src/data/` (positioning, socials, domain tarunfahim.com)
- [x] First primitives: `PillLink`, `RollText`, `SplitReveal`
- [x] Skills marquee, Services (animated illustrations), Work (cards + lightbox + rows), Process, About, Reviews (proof)
- [x] Header / nav (+ animated mobile menu) and footer (contact CTA, wordmark)
- [x] Hero ("studio" design: promise headline, laptop editor → phone reel, continuous GSAP loops)
- [x] Service categories + design showcase rows
- [ ] Case-study pages `/work/[slug]` (needs project descriptions/results)
- [x] Testimonials: 12 verbatim Upwork reviews in scrolling columns
- [x] About (scroll-lit statement, bio, credentials, toolkit)
- [x] Contact CTA + footer (in `SiteFooter`, `#contact`)
- [x] Contact form + Calendly button (2026-11-12) — Calendly link live; needs Resend key/domain
- [x] Blog: `/blog`, `/blog/[slug]` (MDX), homepage preview cards; first post published 2026-10-08
- [ ] Custom cursor, magnetic buttons, page transitions
- [ ] Real OG image with photo + brand fonts
- [x] Search Console property + sitemap submitted (2026-10-10)
- [x] Google Ads + GA4 + GTM + Meta Pixel built and live (2026-11-17): GA4 `G-B58Z90YHR1`, GTM `GTM-MWVJZRQ5`, Google Ads `AW-18569833329`, Meta Pixel `1668681775042894` (ad account `2112135902958655`). Payment methods for both ad accounts still to add by owner
- [ ] Privacy policy page (linked from the cookie banner)

## Open questions

- Contact method: email only, form (needs a provider), or a booking link (Calendly/Cal.com)?
- Where do videos live: self-hosted MP4/WebM, Mux, Vimeo, or YouTube embeds?
