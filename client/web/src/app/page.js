import ExploreByKeywords from "@/components/explore-by-keywords";
import ExploreByAuthorities from "@/components/explore-by-authorities";
import ExploreByStates from "@/components/explore-by-states";
import Services from "@/components/services";
import { Suspense } from "react";
import { HeroOne } from "@/components/hero-one";
import { HeroTwo } from "@/components/hero-two";
import HeroThree from "@/components/hero-three";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={"Loading..."}>
        <HeroOne />
      </Suspense>
      {/* <Suspense fallback={"Loading..."}>
        <HeroTwo />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <HeroThree />
      </Suspense> */}
      <Suspense fallback={"Loading..."}>
        <ExploreByKeywords />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <ExploreByStates />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <ExploreByAuthorities />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <Services />
      </Suspense>
    </div>
  );
}
