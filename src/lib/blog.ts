import { readFile } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import { visiblePosts, type BlogPost } from "@/data";

/** Server-only helpers for the blog. Post metadata lives in src/data/blog.ts. */

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 220;

export type PostSummary = BlogPost & { readingMinutes: number };

/** Reads a post body, failing the build with a clear message if it's missing. */
async function readPostSource(slug: string): Promise<string> {
  try {
    return await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    throw new Error(
      `Blog post "${slug}" is listed in src/data/blog.ts but src/content/blog/${slug}.mdx ` +
        "doesn't exist. Check that the slug and the file name match.",
    );
  }
}

/** Estimated reading time from the MDX body (imports, JSX and markdown syntax stripped). */
const readingMinutes = cache(async (slug: string) => {
  const source = await readPostSource(slug);
  const words = source
    .replace(/^(import|export)\s.*$/gm, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_`~|[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
});

const withReadingTime = async (post: BlogPost): Promise<PostSummary> => ({
  ...post,
  readingMinutes: await readingMinutes(post.slug),
});

/** All visible posts, newest first. */
export const getPosts = cache(async () => {
  const slugs = visiblePosts.map((post) => post.slug);
  const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicate) throw new Error(`Blog slug "${duplicate}" is used twice in src/data/blog.ts.`);
  return Promise.all(visiblePosts.map(withReadingTime));
});

export async function getPost(slug: string): Promise<PostSummary | undefined> {
  const post = visiblePosts.find((p) => p.slug === slug);
  return post && withReadingTime(post);
}

/** Up to `limit` other posts, same category first. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<PostSummary[]> {
  const others = (await getPosts()).filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** The compiled MDX body as a component. */
export async function loadPostBody(slug: string): Promise<MDXContent> {
  const mod: { default: MDXContent } = await import(`@/content/blog/${slug}.mdx`);
  return mod.default;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** "Oct 7, 2026" — UTC so server and client always agree. */
export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso));
