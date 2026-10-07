import { ImageResponse } from "next/og";
import { visiblePosts } from "@/data";
import { siteConfig } from "@/config/site";

/** Per-post social share image: category, title and author on the brand dark. */
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return visiblePosts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = visiblePosts.find((p) => p.slug === slug);
  const title = post?.title ?? siteConfig.name;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0A0A0A",
        color: "#F4F1EC",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 26, letterSpacing: 2 }}>
        <span style={{ color: "#E8352B" }}>{(post?.category ?? "Blog").toUpperCase()}</span>
        <span style={{ color: "#8C8782", marginLeft: 16 }}>· JOURNAL</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 64 : 80,
          fontWeight: 800,
          letterSpacing: -3,
          lineHeight: 1.02,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8C8782" }}
      >
        <span>{siteConfig.name}</span>
        <span style={{ display: "flex", alignItems: "center" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
          <span
            style={{
              display: "flex",
              marginLeft: 18,
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#E8352B",
            }}
          />
        </span>
      </div>
    </div>,
    size,
  );
}
