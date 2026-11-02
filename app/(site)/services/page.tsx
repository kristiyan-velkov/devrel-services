import type { Metadata } from "next";
import { ServiceCalculator } from "@/components/ServiceCalculator";
import { Services } from "@/components/Services";
import { identity, meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Services — ${meta.shortTitle}`,
  description: `À la carte DevRel services and a custom quote calculator for the ${identity.counterparty} partnership.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <ServiceCalculator />
    </>
  );
}
