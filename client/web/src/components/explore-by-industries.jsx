"use client";
import industries from "@/services/industries";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import IndustryCard from "./cards/industry";
import Section from "./layout/section";
import SectionHeading from "./layout/section-heading";
import { Button } from "./ui/button";
import ErrorMessage from "./ui/error";
import { Skeleton } from "./ui/skeleton";

export default function ExploreByIndustries() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: industries.getFeatured,
    queryKey: ["featured-industries"],
    staleTime: 1000 * 60 * 2,
  });
  const router = useRouter();
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <SectionHeading heading="Explore by Industries" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={"h-32 w-44 bg-gray-200"} />
                ))
              : data?.map((industry) => (
                  <IndustryCard industry={industry} key={industry.id} />
                ))}
          </div>
          <Button
            className="mx-auto flex items-center rounded-full"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
            onClick={() => router.push("/industries")}
            type="button"
          >
            View all industries
          </Button>
        </div>
      </div>
    </Section>
  );
}
