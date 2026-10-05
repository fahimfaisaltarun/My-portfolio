/**
 * Content model for everything shown on the site. Components render these
 * types; the data itself lives in the sibling files of this folder.
 */

/* ------------------------------------------------------------------ media */

export type MediaAspect = "16:9" | "9:16" | "1:1" | "4:5";

export type ImageAsset = {
  type: "image";
  /** Path under /public (e.g. "/images/work/x.webp") or an allowed remote URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VideoAsset = {
  type: "video";
  /** Path under /public (e.g. "/videos/x.mp4"), a YouTube/Vimeo URL or a host URL. */
  src: string;
  /** Poster frame shown before play; also the LCP candidate. */
  poster: string;
  aspect: MediaAspect;
  /** Optional captions file (.vtt) — good for accessibility and SEO. */
  captions?: string;
  /** Length in seconds, used for VideoObject JSON-LD. */
  durationSeconds?: number;
};

export type MediaAsset = ImageAsset | VideoAsset;

/* --------------------------------------------------------------- identity */

export type SocialPlatform =
  | "upwork"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "x"
  | "youtube"
  | "tiktok"
  | "behance"
  | "dribbble"
  | "github";

export type SocialLink = { platform: SocialPlatform; label: string; url: string };

export type Profile = {
  fullName: string;
  /** Name used in casual copy ("Hi, I'm Fahim"). */
  shortName: string;
  /** Primary role line — drives SEO title, JSON-LD jobTitle, hero label. */
  headline: string;
  /** 1–2 sentence pitch — drives meta description. */
  summary: string;
  /** Longer about-me paragraphs. */
  bio: string[];
  location: { city?: string; country: string; timezone: string };
  email: string;
  languages: string[];
  /** Main portrait (hero, about, OG image). */
  portrait: ImageAsset;
  /** Short intro / showreel video (e.g. Upwork profile video). */
  introVideo?: string;
  socials: SocialLink[];
  /** The one main call to action used in hero, header and contact sections. */
  primaryCta: { label: string; href: string };
  availability?: string;
};

export type Agency = {
  name: string;
  url: string;
  role: string;
  tagline: string;
  summary: string;
  foundedYear: number;
  teamSize: string;
  location: { city: string; country: string };
  upworkUrl?: string;
};

export type NavItem = { label: string; href: string };

/** Standard section header copy. `emphasis` = word inside `title` set in accent serif. */
export type SectionCopy = { eyebrow: string; title: string; emphasis?: string; intro?: string };

/* -------------------------------------------------------------- offering */

export type ServiceCategory =
  | "social-media"
  | "short-form-video"
  | "content-design"
  | "paid-ads"
  | "web-design"
  | "seo"
  | "branding"
  | "lead-generation"
  | "virtual-assistant";

export type Service = {
  id: ServiceCategory;
  /** Short category label shown above the title, e.g. "Short-form video". */
  label: string;
  title: string;
  /** Word(s) inside `title` to render with the accent-serif style. */
  emphasis?: string;
  summary: string;
  deliverables: string[];
  /** Shown on the homepage when true; others can live on a services page. */
  featured: boolean;
  cta?: { label: string; href: string };
};

export type Industry = { id: string; label: string };

export type Tool = {
  name: string;
  group: "design" | "video" | "social" | "web" | "productivity" | "ai";
};

export type Stat = {
  id: "hours" | "jobs" | "reviews";
  value: number;
  /** Rendered after the number, e.g. "+", "%", "h". */
  suffix?: string;
  label: string;
  /** Where the number comes from, so it can be re-verified. */
  source: string;
};

/* ----------------------------------------------------------------- proof */

export type WorkItem = {
  slug: string;
  title: string;
  client?: string;
  category: ServiceCategory;
  industry?: string;
  /** ISO date (YYYY-MM-DD) the project shipped. */
  date?: string;
  summary?: string;
  /** Short measurable result, e.g. "+38% engagement in 60 days". */
  result?: string;
  media?: MediaAsset[];
  /** Link to the original case (Upwork portfolio, live site…). */
  href?: string;
  featured?: boolean;
  /** Drafts are kept in data but never rendered. */
  status: "draft" | "published";
};

/** One social media design showcase board (several post designs for one industry). */
export type DesignShowcase = {
  slug: string;
  /** Short display label, e.g. "Dental clinic". */
  industry: string;
  /** Industry group used for counting/filtering (several boards can share one). */
  sector: string;
  image: ImageAsset;
  /** Shown in homepage rows; the rest can appear on a full gallery page. */
  featured: boolean;
};

export type Testimonial = {
  /** The review text, exactly as the client wrote it. */
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** Upwork job title the review belongs to, e.g. "Instagram Content Creator". */
  project?: string;
  /** Star rating from the source review (1–5). */
  rating?: number;
  /** ISO date (YYYY-MM or YYYY-MM-DD) the review was left. */
  date?: string;
  /** Upwork endorsement tags the client chose, e.g. "Committed to Quality". */
  endorsements?: string[];
  /** Optional photo under /public; initials are shown when absent. */
  avatar?: string;
  source: "upwork" | "direct" | "linkedin" | "google";
  /** Only approved testimonials render. */
  approved: boolean;
};

export type Credential = {
  kind: "education" | "certification" | "experience";
  title: string;
  issuer: string;
  start?: string;
  end?: string;
};
