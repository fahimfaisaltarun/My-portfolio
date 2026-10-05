import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Default social share image (also used as twitter:image via the file
 * convention fallback). Swap for a static `opengraph-image.jpg` with a real
 * photo/thumbnail once brand imagery exists.
 * TODO: load Inter Tight / Instrument Serif .ttf via `fonts` for on-brand type.
 */
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
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
        <div style={{ display: "flex", fontSize: 26, color: "#8C8782", letterSpacing: 2 }}>
          {siteConfig.jobTitle.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 36, fontSize: 40 }}>
            <span>Edits that make people</span>
            <span
              style={{
                marginLeft: 16,
                padding: "2px 22px",
                borderRadius: 999,
                background: "#E8352B",
                color: "#0A0A0A",
                fontStyle: "italic",
              }}
            >
              stop
            </span>
            <span style={{ marginLeft: 16 }}>the scroll</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8C8782" }}>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ display: "flex", width: 18, height: 18, borderRadius: 999, background: "#E8352B" }} />
        </div>
      </div>
    ),
    size,
  );
}
