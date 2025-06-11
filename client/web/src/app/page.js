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
      <Suspense fallback={"Loading..."}>
        <Hero />
      </Suspense>
      {/* <Suspense fallback={"Loading..."}>
        <HeroTwo />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <HeroThree />
      </Suspense> */}
      {/* <Suspense fallback={"Loading..."}>
        <ExploreByIndustries />
      </Suspense> */}
      <Suspense fallback={"Loading..."}>
        <ExploreByStates />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <ExploreByAuthorities />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <Services />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <PlanPricingSection />
      </Suspense>
    </div>
  );
}
