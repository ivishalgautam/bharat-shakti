"use client";
import { useQuery } from "@tanstack/react-query";
import authorities from "@/services/authorities";
import { Skeleton } from "./ui/skeleton";
import ErrorMessage from "./ui/error";
import Section from "./layout/section";
import AuthorityCard from "./cards/authority";

export default function Authorities() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authorities"],
    queryFn: () => authorities.get(),
  });

  if (isError) return <ErrorMessage error={error} />;

  return (
    <Section>
      <div className="container px-4 md:px-6">
        <div className="grid min-h-96 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className={"h-16 w-64 bg-gray-200"} />
              ))
            : data?.map((authority) => (
                <AuthorityCard key={authority.id} authority={authority} />
              ))}
        </div>
      </div>
    </Section>
  );
}
