import type { Metadata } from "next";
import { Why } from "@/components/Why";
import { identity, meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Why Kristiyan — ${meta.shortTitle}`,
  description: `Why ${identity.person} for ${identity.counterparty} DevRel: stage reach, newsletters, and adoption-ready developer content.`,
  alternates: { canonical: "/why" },
};

export default function WhyPage() {
  return <Why />;
}
