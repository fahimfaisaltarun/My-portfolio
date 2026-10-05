import type { Industry, Service, Tool } from "./types";

// Source: Upwork profile + agency skills. `featured` = shown on homepage.
// Homepage features (decided 2026-10-05), in this order: social, short-form video, web, paid ads.
export const services: Service[] = [
  {
    id: "social-media",
    label: "Social media",
    title: "Social media that actually grows",
    emphasis: "grows",
    summary: "Strategy, calendars and daily posting that build a real audience. Never random.",
    deliverables: ["Strategy", "Content calendar", "Community", "Profile growth"],
    featured: true,
  },
  {
    id: "short-form-video",
    label: "Short-form video",
    title: "Reels that stop the scroll",
    emphasis: "stop",
    summary: "Hook-first edits for Reels, TikTok and Shorts, cut to be watched to the end.",
    deliverables: ["Reels", "TikTok", "YouTube Shorts", "Captions and hooks"],
    featured: true,
  },
  {
    id: "web-design",
    label: "Websites",
    title: "Websites that convert",
    emphasis: "convert",
    summary: "Fast WordPress, Wix and Shopify sites your team can run without a developer.",
    deliverables: ["WordPress", "Shopify", "Wix", "Webflow"],
    featured: true,
  },
  {
    id: "paid-ads",
    label: "Paid ads",
    title: "Ads that reach buyers",
    emphasis: "buyers",
    summary: "Meta and Google campaigns with creative built to convert, not just get clicks.",
    deliverables: ["Meta Ads", "Google Ads", "Ad creative", "Retargeting"],
    featured: true,
  },
  {
    id: "content-design",
    label: "Design",
    title: "Branded content and graphics",
    emphasis: "Branded",
    summary: "Posts, carousels, stories, menus and flyers in your brand style.",
    deliverables: ["Posts and carousels", "Stories", "Menus and flyers", "Canva systems"],
    featured: false,
  },
  {
    id: "seo",
    label: "SEO",
    title: "SEO",
    summary: "Audits and keyword research that bring in organic traffic.",
    deliverables: ["SEO audits", "Keyword research", "On-page optimization"],
    featured: false,
  },
  {
    id: "branding",
    label: "Branding",
    title: "Logo and branding",
    summary: "Logos and visual identities for small businesses.",
    deliverables: ["Logo design", "Brand guidelines"],
    featured: false,
  },
  {
    id: "lead-generation",
    label: "Lead generation",
    title: "Lead generation",
    summary: "Lead generation campaigns delivered through the BrandEzzy team.",
    deliverables: [],
    featured: false,
  },
  {
    id: "virtual-assistant",
    label: "Virtual assistance",
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
