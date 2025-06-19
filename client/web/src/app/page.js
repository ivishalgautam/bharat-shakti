import ExploreByAuthorities from "@/components/explore-by-authorities";
import ExploreByStates from "@/components/explore-by-states";
import { Hero } from "@/components/hero";
import PlanPricingSection from "@/components/plan-pricing-section";
import Services from "@/components/services";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense>
        <Hero />
      </Suspense>
      {/* <Suspense>
        <ExploreByIndustries />
      </Suspense> */}
      <Suspense>
        <ExploreByStates />
      </Suspense>
      <Suspense>
        <ExploreByAuthorities />
      </Suspense>
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <PlanPricingSection />
      </Suspense>
    </div>
  );
}
