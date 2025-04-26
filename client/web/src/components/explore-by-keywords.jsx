"use client";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import keywords from "@/services/keyword";
import { useQuery } from "@tanstack/react-query";
import config from "@/config";
import ErrorMessage from "./ui/error";
import { Skeleton } from "./ui/skeleton";
import Section from "./layout/section";
import KeywordCard from "./cards/keyword";

export default function ExploreByKeywords() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: keywords.getFeatured,
    queryKey: ["featured-keywords"],
    staleTime: 1000 * 60 * 2,
  });
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            <h2 className="text-2xl font-bold tracking-tight">
              Explore by Industries
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={"h-32 w-44 bg-gray-200"} />
                ))
              : data?.map((keyword) => (
                  <KeywordCard keyword={keyword} key={keyword.id} />
                ))}
          </div>
          <Button
            className="mx-auto flex items-center rounded-full"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
          >
            View all industries
          </Button>
        </div>
      </div>
    </Section>
  );
}
