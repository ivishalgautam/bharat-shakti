"use client";
import industries from "@/services/industries";
import { useQuery } from "@tanstack/react-query";
import IndustryCard from "./cards/keyword";
import ErrorMessage from "./ui/error";
import { Skeleton } from "./ui/skeleton";

export default function Industries() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => industries.get(),
    queryKey: ["industries"],
  });
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className={"h-32 w-44 bg-gray-200"} />
              ))
            : data?.map((industry) => (
                <IndustryCard industry={industry} key={industry.id} />
              ))}
        </div>
      </div>
    </div>
  );
}
