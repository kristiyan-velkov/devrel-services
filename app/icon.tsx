import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Matches the green dot on the “i” in bulgaritech.com wordmark (#3BAA3B). */
const BRAND_GREEN = "#3BAA3B";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#f6f8fc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: BRAND_GREEN,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
