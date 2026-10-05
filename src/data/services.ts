import type { Industry, Service, Tool } from "./types";

// Source: Upwork profile + agency skills. `featured` = shown on homepage.
// Homepage features (decided 2026-10-05), in this order: social, short-form video, web, paid ads.
export const services: Service[] = [
  {
    id: "social-media",
    title: "Social media that actually grows",
    emphasis: "grows",
    summary:
      "Strategy, content calendars, scheduling and community management across every major platform — consistent, on-brand, never random.",
    deliverables: [
      "Content strategy and monthly calendars",
      "Scheduling and posting",
      "Audience engagement",
      "Competitor and hashtag research",
      "Profile optimization",
    ],
    featured: true,
  },
  {
    id: "short-form-video",
    title: "Reels, TikToks and Shorts that stop the scroll",
    emphasis: "stop",
    summary:
      "Hook-first short-form video editing with captions and trend-based pacing, built to be watched to the end.",
    deliverables: ["Instagram Reels", "TikTok videos", "YouTube Shorts", "Captions and hooks"],
    featured: true,
  },
  {
    id: "web-design",
    title: "Websites on WordPress, Wix and Shopify",
    emphasis: "Websites",
    summary: "Fast, conversion-focused websites and online stores your team can manage themselves.",
    deliverables: ["WordPress / Elementor", "Wix", "Shopify stores", "Webflow"],
    featured: true,
  },
  {
    id: "paid-ads",
    title: "Paid ads on Meta and Google",
    emphasis: "Paid ads",
    summary:
      "Campaign setup and management on Meta and Google Ads, paired with creative that converts.",
    deliverables: ["Meta Ads Manager", "Google Ads", "Ad creative", "Audience targeting"],
    featured: true,
  },
  {
    id: "content-design",
    title: "Branded content and graphics",
    emphasis: "Branded",
    summary:
      "Posts, carousels, stories, menus, flyers and promotional graphics in your brand style.",
    deliverables: [
      "Post and carousel design",
      "Story designs",
      "Menus and flyers",
      "Canva systems",
    ],
    featured: false,
  },
  {
    id: "seo",
    title: "SEO",
    summary: "Audits and keyword research that bring in organic traffic.",
    deliverables: ["SEO audits", "Keyword research", "On-page optimization"],
    featured: false,
  },
  {
    id: "branding",
    title: "Logo and branding",
    summary: "Logos and visual identities for small businesses.",
    deliverables: ["Logo design", "Brand guidelines"],
    featured: false,
  },
  {
    id: "lead-generation",
    title: "Lead generation",
    summary: "Lead generation campaigns delivered through the BrandEzzy team.",
    deliverables: [],
    featured: false,
  },
  {
    id: "virtual-assistant",
    title: "Virtual assistance",
    summary: "Reliable admin and marketing support delivered through the BrandEzzy team.",
    deliverables: [],
    featured: false,
  },
];

// Source: Upwork profile.
export const industries: Industry[] = [
  { id: "wellness", label: "Healthcare and wellness" },
  { id: "hospitality", label: "Restaurants and hospitality" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "real-estate", label: "Real estate" },
  { id: "beauty", label: "Beauty and skincare" },
  { id: "fitness", label: "Fitness and lifestyle" },
  { id: "personal-brands", label: "Personal brands and small businesses" },
];

export const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "Pinterest",
  "YouTube",
  "X",
] as const;

export const tools: Tool[] = [
  { name: "Canva Pro", group: "design" },
  { name: "CapCut", group: "video" },
  { name: "Meta Business Suite", group: "social" },
  { name: "Buffer", group: "social" },
  { name: "Later", group: "social" },
  { name: "Hootsuite", group: "social" },
  { name: "WordPress", group: "web" },
  { name: "Elementor", group: "web" },
  { name: "Wix", group: "web" },
  { name: "Shopify", group: "web" },
  { name: "Webflow", group: "web" },
  { name: "Notion", group: "productivity" },
  { name: "Trello", group: "productivity" },
  { name: "ChatGPT", group: "ai" },
];
