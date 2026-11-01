import { ImageResponse } from "next/og";
import { formatEur, meta, quotes } from "@/data/proposal";

export const alt = meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const growth = quotes.growth;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070b14",
          color: "#e8eef8",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3 }}>
          <span>BULGARITECH EOOD</span>
          <span style={{ color: "#9ec4ff" }}>PROPOSAL · NOT AN OFFICIAL BRIGHT DATA SITE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 28, color: "#9ec4ff", letterSpacing: 2 }}>DEVREL PARTNERSHIP</div>
          <div style={{ fontSize: 68, lineHeight: 1.02, fontWeight: 650, maxWidth: 980 }}>
            Put Bright Data in front of 100,000+ developers.
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 26 }}>
          <span>Nov 2026 – Mar 2027</span>
          <span style={{ color: "#9ec4ff" }}>
            Plan 2 Growth · {formatEur(growth.monthly)}/mo · save {growth.savingPct}%
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
