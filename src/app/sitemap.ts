import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { visiblePosts } from "@/data";

/**
 * Add every public, indexable route here. Utility routes (e.g. /design)
 * stay out — they are noindex and disallowed in robots.ts. Blog posts are
 * added automatically from src/data/blog.ts.
 */
const routes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  // Listed only once a post is published (an empty /blog is noindex).
  ...(visiblePosts.length > 0
    ? [{ path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 }]
    : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
  const posts = visiblePosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...posts];
}
