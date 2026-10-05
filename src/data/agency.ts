import type { Agency } from "./types";

// Source: Upwork agency profile + brandezzy.com (fetched 2026-10-05).
// Note: brandezzy.com still shows template placeholders (0+ stats, demo
// address/testimonials) — none of that is used here.
export const agency: Agency = {
  name: "BrandEzzy",
  url: "https://brandezzy.com",
  role: "Founder",
  tagline: "Make your business shine",
  summary:
    "A digital agency for social media marketing, SEO, web design and development, paid ads, lead generation and virtual assistance.",
  foundedYear: 2024,
  // Decided 2026-10-05: publish the Upwork figure.
  teamSize: "11–50",
  location: { city: "Khulna", country: "Bangladesh" },
  // TODO(owner): public agency Upwork URL.
};
