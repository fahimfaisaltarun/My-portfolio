import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

/**
 * MDX for blog posts. Plugins are passed by name (strings) so they work with
 * Turbopack, which can't receive JS functions. remark-gfm adds tables,
 * strikethrough, task lists and autolinks.
 */
const withMDX = createMDX({
  options: { remarkPlugins: [["remark-gfm", {}]] },
});

export default withMDX(nextConfig);
