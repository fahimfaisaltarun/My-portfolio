/**
 * Site-wide SEO configuration, derived from the content in `src/data`.
 * Edit people/agency facts in `src/data/*`; edit only SEO-specific settings here.
 */
import { profile } from "@/data";

/** Production domain. Override with NEXT_PUBLIC_SITE_URL (e.g. for preview deployments). */
const PRODUCTION_URL = "https://tarunfahim.com";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: profile.fullName,
  shortName: profile.shortName,
  jobTitle: profile.headline,
  title: `${profile.fullName} — ${profile.headline}`,
  description: profile.summary,
  url: resolveSiteUrl().replace(/\/$/, ""),
  locale: "en_US",
  email: profile.email,
  keywords: [
    "social media marketing",
    "social media manager",
    "content strategist",
    "short form video editing",
    "Instagram Reels editor",
    "TikTok marketing",
    "Meta ads",
    "Google ads",
    "WordPress website design",
    "Shopify website design",
    "Wix website design",
    "digital marketing agency",
    "Upwork top rated freelancer",
  ],
  /** Twitter/X handle including @, used for twitter:creator. */
  twitterHandle: "@TarunFahim",
  themeColor: "#0A0A0A",
} as const;

export type SiteConfig = typeof siteConfig;

export const socialLinks = profile.socials.map((s) => s.url);
