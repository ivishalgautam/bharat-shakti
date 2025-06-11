import ExploreByIndustries from "@/components/explore-by-industries";
import ExploreByAuthorities from "@/components/explore-by-authorities";
import ExploreByStates from "@/components/explore-by-states";
import Services from "@/components/services";
import PlanPricingSection from "@/components/plan-pricing-section";
import { Suspense } from "react";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense>
        <Hero />
      </Suspense>
      {/* <Suspense>
        <HeroTwo />
      </Suspense>
      <Suspense>
        <HeroThree />
      </Suspense> */}
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
