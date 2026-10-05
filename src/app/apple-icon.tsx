import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 800, color: "#F4F1EC", letterSpacing: -6 }}>F</div>
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 44,
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#E8352B",
          }}
        />
      </div>
    ),
    size,
  );
}
