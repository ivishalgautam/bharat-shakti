import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const FilterBoxSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default function FilterTendersLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filter Tenders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Search Bar Skeleton */}
          <div className="col-span-full space-y-2">
            <div className="relative">
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>

          {/* Filter Box Skeletons */}
          <div className="space-y-2">
            <FilterBoxSkeleton />
          </div>

          <div className="space-y-2">
            <FilterBoxSkeleton />
          </div>

          <div className="space-y-2">
            <FilterBoxSkeleton />
          </div>

          <div className="space-y-2">
            <FilterBoxSkeleton />
          </div>

          <div className="space-y-2">
            <FilterBoxSkeleton />
          </div>

          {/* Tender Value Range Skeleton */}
          <div className="col-span-2 space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Date Range Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Reset Button Skeleton */}
          <div className="flex items-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
