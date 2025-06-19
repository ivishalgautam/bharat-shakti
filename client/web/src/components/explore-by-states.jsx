"use client";
import states from "@/services/state";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import StateCard from "./cards/state-card";
import Section from "./layout/section";
import SectionHeading from "./layout/section-heading";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function ExploreByStates() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: states.getFeatured,
    queryKey: ["featured-states"],
    staleTime: 1000 * 60 * 2,
  });
  const router = useRouter();
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section className="min-h-[90vh] bg-gradient-to-b from-primary/30 to-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            {/* <MapPin className="mr-2 h-5 w-5" /> */}
            <h2 className="text-2xl font-bold tracking-tight text-white"></h2>
          </div>
          <SectionHeading heading="Explore by States" />
          <div className="grid min-h-96 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={"size-44 bg-gray-200"} />
                ))
              : data?.map((state) => (
                  <StateCard key={state.id} state={state} />
                ))}
          </div>
          <Button
            className="mx-auto flex items-center rounded-full"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
            onClick={() => router.push("/states")}
            type="button"
          >
            View all states
          </Button>
        </div>
      </div>
    </Section>
  );
}
