import type { BlogPost, SectionCopy } from "./types";

/**
 * Blog posts. Each entry needs a matching body file in src/content/blog/<slug>.mdx.
 * Newest first is not required — lists are sorted by `publishedAt`.
 *
 * To publish a post:
 * 1. Write the body in src/content/blog/<slug>.mdx (Markdown; start with a ## heading,
 *    the title below becomes the page's h1).
 * 2. Add an entry here with the same slug and `status: "draft"`, check it at
 *    localhost:3000/blog/<slug>, then switch to `status: "published"`.
 * 3. Cover images go in public/images/blog/<slug>.webp (1600×900).
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "example-post",
    title: "Example post: every formatting option in one place",
    excerpt:
      "A reference post showing headings, lists, quotes, tables, images and links. Duplicate it to start a new article, then delete it.",
    publishedAt: "2026-10-07",
    category: "Guide",
    tags: ["template"],
    cover: {
      type: "image",
      src: "/images/work/social-media-design/fashion-social-media-design.webp",
      alt: "Fashion brand social media post designs",
      width: 1000,
      height: 750,
    },
    status: "draft",
  },
];

/** Homepage preview section (last section before the footer). */
export const blogCopy: SectionCopy = {
  eyebrow: "Journal",
  title: "Notes from the feed",
  emphasis: "feed",
  intro: "Practical takes on social media, short-form video and growing a brand online.",
};

/** /blog index page header. */
export const blogPageCopy = {
  eyebrow: "Journal",
  title: "Notes from the feed",
  emphasis: "feed",
  intro:
    "Practical takes on social media marketing, short-form video and building a brand that converts — from real client work.",
  /** Shown on /blog when nothing is published yet. */
  empty: "First articles are on the way. Check back soon.",
} as const;
