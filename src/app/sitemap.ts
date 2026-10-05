import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Add every public, indexable route here. Utility routes (e.g. /design)
 * stay out — they are noindex and disallowed in robots.ts.
 */
const routes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [{ path: "/", changeFrequency: "monthly", priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
