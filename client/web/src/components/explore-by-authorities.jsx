"use client";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import authorities from "@/services/authorities";
import Image from "next/image";
import config from "@/config";
import { Skeleton } from "./ui/skeleton";
import ErrorMessage from "./ui/error";
import Section from "./layout/section";
import AuthorityCard from "./cards/authority";

export default function ExploreByAuthorities() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-authorities"],
    queryFn: authorities.getFeatured,
    staleTime: 1000 * 60 * 2,
  });

  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            {/* <Building2 className="mr-2 h-5 w-5" /> */}
            <h2 className="text-2xl font-bold tracking-tight">
              Explore by Authorities
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
          >
            View all authorities
          </Button>
        </div>
      </div>
    </Section>
  );
}
