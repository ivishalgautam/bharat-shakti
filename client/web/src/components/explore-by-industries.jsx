"use client";
import { ArrowRight, Tag } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "./ui/error";
import { Skeleton } from "./ui/skeleton";
import Section from "./layout/section";
import industries from "@/services/industries";
import IndustryCard from "./cards/keyword";
import SectionHeading from "./layout/section-heading";
import { useRouter } from "next/navigation";

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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
