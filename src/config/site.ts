/**
 * Single source of truth for site-wide identity and SEO data.
 * Metadata, JSON-LD, sitemap, robots, manifest and OG images all read from here.
 * Edit this file (not the individual routes) when your details change.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Fahim Faisal Tarun",
  shortName: "Fahim",
  // TODO: confirm job title wording before launch.
  jobTitle: "Video Editor & Motion Designer",
  title: "Fahim Faisal Tarun — Video Editor & Motion Designer",
  description:
    "Freelance video editor and motion designer crafting scroll-stopping performance ads, UGC edits, podcasts and motion graphics that help brands get watched and sell.",
  url: resolveSiteUrl().replace(/\/$/, ""),
  locale: "en_US",
  email: "fahimfaisaltarun@gmail.com",
  keywords: [
    "video editor",
    "freelance video editor",
    "motion designer",
    "motion graphics",
    "after effects",
    "performance ads",
    "UGC video editing",
    "podcast editing",
    "short form video editor",
    "creative director",
  ],
  // TODO: fill in real profile URLs. Empty strings are filtered out of JSON-LD.
  socials: {
    x: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    behance: "",
    upwork: "",
  },
  /** Twitter/X handle including @, used for twitter:creator. */
  twitterHandle: "",
  themeColor: "#0A0A0A",
} as const;

export type SiteConfig = typeof siteConfig;

export const socialLinks = Object.values(siteConfig.socials).filter(Boolean);
