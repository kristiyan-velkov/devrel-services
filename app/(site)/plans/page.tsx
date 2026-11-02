import type { Metadata } from "next";
import { Agreement } from "@/components/Agreement";
import { Bonus } from "@/components/Bonus";
import { Plans } from "@/components/Plans";
import { Services } from "@/components/Services";
import { meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Plans — ${meta.shortTitle}`,
  description: meta.description,
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <Agreement />
      <Plans />
      <Services />
      <Bonus />
    </>
  );
}
