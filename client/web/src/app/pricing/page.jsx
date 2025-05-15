import PricingSection from "@/components/plan-pricing-section";
import React, { Suspense } from "react";

export default function PricingPage() {
  return (
    <Suspense fallback={"Loading..."}>
      <PricingSection />
    </Suspense>
  );
}
