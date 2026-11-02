import type { Metadata } from "next";
import { Publishing } from "@/components/Publishing";
import { identity, meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Publishing calendar — ${meta.shortTitle}`,
  description: `November 2026 – March 2027 publishing and live session calendar for the ${identity.counterparty} DevRel partnership.`,
  alternates: { canonical: "/calendar" },
};

export default function CalendarPage() {
  return <Publishing />;
}
