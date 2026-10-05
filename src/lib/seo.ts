import type { Metadata } from "next";
import { siteConfig, socialLinks } from "@/config/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  /** Route path starting with "/", used for the canonical URL. */
  path?: string;
  /** Social share image path. Defaults to the root generated OG image. */
  image?: string;
  /** Set true for utility pages that should never appear in search. */
  noIndex?: boolean;
};

/**
 * Per-page metadata helper. Root defaults live in `src/app/layout.tsx`;
 * pages only pass what differs. Title is wrapped by the root `title.template`.
 *
 * Note: Next.js merges metadata *shallowly* — a page-level `openGraph` object
 * replaces the root one entirely. That's why every OG/Twitter field (images,
 * siteName, locale, card) is repeated here instead of relying on inheritance.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/opengraph-image",
  noIndex = false,
}: PageMetadataInput = {}): Metadata {
  const shareTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: shareTitle,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
      creator: siteConfig.twitterHandle || undefined,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();

/* ---------------------------------------------------------------- JSON-LD */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: absoluteUrl("/opengraph-image"),
    knowsAbout: siteConfig.keywords,
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    url: siteConfig.url,
    image: absoluteUrl("/opengraph-image"),
    founder: { "@id": `${siteConfig.url}/#person` },
    areaServed: "Worldwide",
    serviceType: [
      "Video editing",
      "Motion graphics",
      "Performance ad creative",
      "UGC video editing",
      "Podcast editing",
    ],
  };
}

/** Serialise JSON-LD safely (escapes `<` to avoid script injection). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
