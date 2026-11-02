import type { Metadata } from "next";
import { Suspense } from "react";
import { Agreement } from "@/components/Agreement";
import { Plans } from "@/components/Plans";
import { PlansPrintSheet } from "@/components/PlansPrintSheet";
import { PrintPlansOnLoad } from "@/components/PrintPlansOnLoad";
import { meta } from "@/data/proposal";

export const metadata: Metadata = {
  title: `Plans — ${meta.shortTitle}`,
  description: meta.description,
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <Suspense fallback={null}>
        <PrintPlansOnLoad />
      </Suspense>
      <Agreement />
      <Plans />
      <PlansPrintSheet />
    </>
  );
}
