import type { Metadata } from "next";
import { Suspense } from "react";
import { ConferencesTimeline } from "@/components/ConferencesTimeline";
import { identity, meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Conferences — ${meta.shortTitle}`,
  description: `Speaking record for ${identity.person}: chronological in-person and online conferences, with organiser-published audience figures.`,
  alternates: { canonical: "/conferences" },
};

export default function ConferencesPage() {
  return (
    <Suspense
      fallback={
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <p className="font-mono text-xs tracking-widest text-faint uppercase">Loading timeline…</p>
          </div>
        </section>
      }
    >
      <ConferencesTimeline />
    </Suspense>
  );
}
