import { ImageResponse } from "next/og";

export const alt = "Sourabh Prasad – Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#050510",
          backgroundImage: "radial-gradient(circle at 15% 10%, #2a1f5c 0%, #050510 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#22d3ee" }}>sourabh.dev</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            I build production software
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#a78bfa" }}>
            businesses run on.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#9aa3b5" }}>
          <span>Sourabh Prasad · Full Stack Developer</span>
          <span>Next.js · TypeScript · PostgreSQL</span>
        </div>
      </div>
    ),
    size
  );
}
