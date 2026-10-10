/**
 * Single source of truth for all portfolio content.
 * Import from "@/data" — never hard-code copy, numbers or links in components.
 */
export { profile } from "./profile";
export { agency } from "./agency";
export { footerCta } from "./navigation";
export { hero } from "./hero";
export { intro } from "./intro";
export {
  marqueeItems,
  servicesCopy,
  workCopy,
  processCopy,
  processSteps,
  aboutCopy,
  reviewsCopy,
  proofStats,
} from "./home";
export { services, industries, platforms, tools } from "./services";
export { stats, badges, upworkRating, work, credentials } from "./proof";
export { testimonials, testimonialsCopy } from "./testimonials";
export { designShowcase, designShowcaseSource } from "./design-showcase";
export { blogPosts, blogCopy, blogPageCopy } from "./blog";
export { consentCopy } from "./consent";
export type * from "./types";

import { work as allWork } from "./proof";
import { testimonials as allTestimonials } from "./testimonials";
import { designShowcase as allShowcase } from "./design-showcase";
import { blogPosts as allPosts } from "./blog";
import { mainNav as allNav } from "./navigation";

/** Work items that are ready to render. */
export const publishedWork = allWork.filter((item) => item.status === "published");

/** Testimonials the owner has approved for display. */
export const approvedTestimonials = allTestimonials.filter((t) => t.approved);

/** Design showcase boards flagged for the homepage. */
export const featuredShowcase = allShowcase.filter((board) => board.featured);

/**
 * Blog posts that can render, newest first. Drafts are included only in
 * development so they can be previewed before publishing.
 */
export const visiblePosts = allPosts
  .filter((post) => post.status === "published" || process.env.NODE_ENV === "development")
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Main nav; the Blog link is hidden until at least one post is visible. */
export const mainNav =
  visiblePosts.length > 0 ? allNav : allNav.filter((item) => item.href !== "/blog");
