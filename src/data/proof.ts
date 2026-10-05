import type { Credential, Stat, Testimonial, WorkItem } from "./types";

// Source for stats: Upwork freelancer profile, fetched 2026-10-05.
// Re-check before launch — these change over time.
export const stats: Stat[] = [
  { value: 5700, suffix: "+", label: "Hours logged on Upwork", source: "Upwork profile" },
  { value: 56, label: "Upwork jobs completed", source: "Upwork profile (12 fixed + 44 hourly)" },
  { value: 24, label: "Client reviews", source: "Upwork profile" },
  // TODO(owner): Top Rated is a badge, not a number — render it separately.
  // TODO(owner): add agency-level numbers (clients served, projects, countries) if you track them.
];

export const badges = ["Top Rated on Upwork"] as const;

/**
 * Titles from the Upwork portfolio. They stay `draft` until media (images or
 * video) and a short summary/result are added — drafts never render.
 */
export const work: WorkItem[] = [
  {
    slug: "medspa-instagram-growth",
    title: "Instagram growth system for a medspa and beauty clinic",
    category: "short-form-video",
    industry: "beauty",
    status: "draft",
  },
  {
    slug: "fashion-brand-weekly-content",
    title: "Fashion brand social content — consistent weekly posting system",
    category: "social-media",
    industry: "ecommerce",
    status: "draft",
  },
  {
    slug: "google-meta-ads",
    title: "Google and Meta ads management",
    category: "paid-ads",
    status: "draft",
  },
  {
    slug: "event-company-wix-site",
    title: "Wix website for an event management company",
    category: "web-design",
    status: "draft",
  },
  {
    slug: "photo-lab-branding",
    title: "Photo lab logo and branding",
    category: "branding",
    status: "draft",
  },
  {
    slug: "catering-menu-design",
    title: "Peanut Butter Bar × Feedee Catering folded menu",
    category: "content-design",
    industry: "hospitality",
    status: "draft",
  },
  {
    slug: "washing-company-logo",
    title: "Logo design for a washing company",
    category: "branding",
    status: "draft",
  },
];

/**
 * Real client quotes only (e.g. copied from Upwork reviews), and only with
 * `approved: true` once you're happy to show them.
 */
export const testimonials: Testimonial[] = [];

// Source: Upwork profile.
export const credentials: Credential[] = [
  {
    kind: "experience",
    title: "Founder",
    issuer: "BrandEzzy",
    start: "2024",
  },
  {
    kind: "education",
    title: "BSc, Computer Science",
    issuer: "North Western University",
    start: "2021",
    end: "2025",
  },
  {
    kind: "certification",
    title: "Online Marketing: SEO and Social Media Marketing Strategy",
    issuer: "Upwork",
  },
  {
    kind: "certification",
    title: "Python Programming and Data Science Basics",
    issuer: "Upwork",
  },
];
