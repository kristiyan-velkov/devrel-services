import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
        <svg width="24" height="24" viewBox="0 0 32 32">
          <path d="M8 16 L16 8 L24 16 L16 24 Z" fill="none" stroke="#0c3d8f" strokeWidth="1.4" />
          <circle cx="8" cy="16" r="2.1" fill="#0c3d8f" />
          <circle cx="16" cy="8" r="2.1" fill="#0c3d8f" />
          <circle cx="24" cy="16" r="2.1" fill="#0c3d8f" />
          <circle cx="16" cy="24" r="2.1" fill="#0c6b42" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
