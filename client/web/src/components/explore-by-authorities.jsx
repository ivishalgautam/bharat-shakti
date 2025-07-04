"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import authorities from "@/services/authorities";
import { Skeleton } from "./ui/skeleton";
import ErrorMessage from "./ui/error";
import Section from "./layout/section";
import AuthorityCard from "./cards/authority";
import SectionHeading from "./layout/section-heading";
import { useRouter } from "next/navigation";

export default function ExploreByAuthorities() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-authorities"],
    queryFn: authorities.getFeatured,
    staleTime: 1000 * 60 * 2,
  });
  const router = useRouter();
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <SectionHeading heading={"Explore by Authorities"} />
          <div className="grid min-h-96 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={"h-16 w-64 bg-gray-200"} />
                ))
              : data?.map((authority) => (
                  <AuthorityCard key={authority.id} authority={authority} />
                ))}
          </div>
          <Button
            className="mx-auto flex items-center rounded-full"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
            onClick={() => router.push("/authorities")}
            type="button"
          >
            View all authorities
          </Button>
        </div>
      </div>
    </Section>
  );
}
