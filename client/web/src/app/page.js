import { lazy, Suspense } from "react";
const ExploreByAuthorities = lazy(
  () => import("@/components/explore-by-authorities"),
);
const ExploreByStates = lazy(() => import("@/components/explore-by-states"));
const Hero = lazy(() =>
  import("@/components/hero").then((module) => ({ default: module.Hero })),
);
const ExploreByIndustries = lazy(
  () => import("@/components/explore-by-industries"),
);
const PlanPricingSection = lazy(
  () => import("@/components/plan-pricing-section"),
);
const Services = lazy(() => import("@/components/services"));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreByIndustries />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreByStates />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreByAuthorities />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Services />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="bg-white py-12 md:py-24 lg:py-32">
          <PlanPricingSection />
        </div>
      </Suspense>
    </div>
  );
}
