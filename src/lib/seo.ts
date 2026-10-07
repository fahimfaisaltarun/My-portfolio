import type { Metadata } from "next";
import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  Offer,
  Organization,
  Person,
  ProfessionalService,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig, socialLinks } from "@/config/site";
import { agency, credentials, profile, services, type BlogPost } from "@/data";

type PageMetadataInput = {
  title?: string;
  description?: string;
  /** Route path starting with "/", used for the canonical URL. */
  path?: string;
  /** Social share image path. Defaults to the root generated OG image. */
  image?: string;
  /** Set true for utility pages that should never appear in search. */
  noIndex?: boolean;
  /** Blog posts: switches og:type to "article" and adds article:* tags. */
  article?: { publishedTime: string; modifiedTime?: string; section?: string; tags?: string[] };
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
  article,
}: PageMetadataInput = {}): Metadata {
  const shareTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(article
        ? { type: "article", authors: [siteConfig.url], ...article }
        : { type: "website" }),
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

export function personJsonLd(): WithContext<Person> {
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
    knowsAbout: [...siteConfig.keywords],
    knowsLanguage: profile.languages,
    address: { "@type": "PostalAddress", addressCountry: profile.location.country },
    worksFor: { "@id": `${siteConfig.url}/#agency` },
    alumniOf: credentials
      .filter((c) => c.kind === "education")
      .map((c) => ({ "@type": "CollegeOrUniversity" as const, name: c.issuer })),
    ...(socialLinks.length > 0 && { sameAs: [...socialLinks] }),
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
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

export function professionalServiceJsonLd(): WithContext<ProfessionalService> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    url: siteConfig.url,
    image: absoluteUrl("/opengraph-image"),
    founder: { "@id": `${siteConfig.url}/#person` },
    areaServed: "Worldwide",
    makesOffer: services.map((service) => offerService(service.title)),
  };
}

function offerService(name: string): Offer {
  return { "@type": "Offer", itemOffered: { "@type": "Service", name } };
}

export function agencyJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#agency`,
    name: agency.name,
    url: agency.url,
    slogan: agency.tagline,
    description: agency.summary,
    foundingDate: String(agency.foundedYear),
    founder: { "@id": `${siteConfig.url}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: agency.location.city,
      addressCountry: agency.location.country,
    },
  };
}

/** Serialise JSON-LD safely (escapes `<` to avoid script injection). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/* ------------------------------------------------------------------- blog */

const postUrl = (slug: string) => absoluteUrl(`/blog/${slug}`);

export function blogJsonLd(posts: BlogPost[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} — Blog`,
    url: absoluteUrl("/blog"),
    inLanguage: "en",
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: postUrl(post.slug),
      datePublished: post.publishedAt,
    })),
  };
}

export function blogPostingJsonLd(
  post: BlogPost & { readingMinutes?: number },
): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl(post.slug)}#article`,
    headline: post.title,
    description: post.excerpt,
    url: postUrl(post.slug),
    mainEntityOfPage: postUrl(post.slug),
    image: absoluteUrl(post.cover?.src ?? `/blog/${post.slug}/opengraph-image`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.category,
    ...(post.tags?.length && { keywords: post.tags.join(", ") }),
    ...(post.readingMinutes && { timeRequired: `PT${post.readingMinutes}M` }),
    inLanguage: "en",
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
    isPartOf: { "@id": `${siteConfig.url}/blog#blog` },
  };
}

/** Breadcrumb trail; pass items in order, starting after Home. */
export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
