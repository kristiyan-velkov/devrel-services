"use client";

import dynamic from "next/dynamic";

const ProxyGlobe = dynamic(
  () => import("@/components/ProxyGlobe").then((module) => module.ProxyGlobe),
  { ssr: false },
);

export function HeroGlobe() {
  return (
    <div className="pointer-events-none absolute inset-0 no-print" aria-hidden="true">
      <ProxyGlobe />
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
