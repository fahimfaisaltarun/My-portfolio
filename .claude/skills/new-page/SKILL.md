---
name: new-page
description: Add a new route/page (e.g. /work, /work/[slug], /about, /contact) with correct metadata, sitemap entry, structured data and layout. Use whenever creating a page.
---

# Add a page

Reference: `docs/seo.md` → "Adding a page". Next.js 16: check
`node_modules/next/dist/docs/01-app/03-api-reference/` for any API you're unsure of
(`generateMetadata`, `generateStaticParams`, `PageProps`).

## Steps

1. `src/app/<route>/page.tsx` — Server Component, default export.
2. Metadata: `export const metadata = createMetadata({ title, description, path })` from
   `@/lib/seo`. Dynamic routes: `generateMetadata` returning `createMetadata(...)`, plus
   `generateStaticParams` from `src/data/*` so pages prerender. Params are a Promise —
   `const { slug } = await params`. Type with `PageProps<"/work/[slug]">`.
3. Markup: `<main id="main">`, exactly one `<h1>`, sections as in the `new-section` skill.
4. Sitemap: add the path (or map over content slugs) in `src/app/sitemap.ts`.
5. Structured data where it fits (e.g. `VideoObject`/`CreativeWork` for case studies): add a
   typed builder in `src/lib/seo.ts` (`schema-dts` types) and render with `<JsonLd>`.
6. Internal/utility page? `createMetadata({ ..., noIndex: true })` + add to `disallow` in
   `src/app/robots.ts`, and keep it out of the sitemap.
7. Verify: page renders in the browser pane, `<title>`/canonical/og tags correct,
   `npm run check` and `npm run build` pass.
