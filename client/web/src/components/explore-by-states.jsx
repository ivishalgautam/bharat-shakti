"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "@tanstack/react-query";
import states from "@/services/state";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import config from "@/config";
import Section from "./layout/section";

export default function ExploreByStates() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: states.getFeatured,
    queryKey: ["featured-states"],
    staleTime: 1000 * 60 * 2,
  });

  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            <h2 className="text-2xl font-bold tracking-tight">
              Explore by States
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className={"size-44 bg-gray-200"} />
                ))
              : data?.map((state) => (
                  <Link
                    key={state.id}
                    href="#"
                    className="rounded-lg border bg-card p-4 text-center shadow-sm transition-colors hover:border-primary hover:bg-primary/10"
                  >
                    <div className="mx-auto size-16 p-2">
                      <Image
                        width={100}
                        height={100}
                        src={`${config.file_base}/${state.image}`}
                        alt={state.name}
                      />
                    </div>
                    <div className="font-medium">{state.name}</div>
                  </Link>
                ))}
          </div>
          <Button
            className="mx-auto flex items-center rounded-full"
            effect="expandIcon"
            icon={ArrowRight}
            iconPlacement="right"
          >
            View all states
          </Button>
        </div>
      </div>
    </Section>
  );
}
