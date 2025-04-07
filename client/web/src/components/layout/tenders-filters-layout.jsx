import React, { Suspense } from "react";
import TendersFilters from "../tenders/tenders-filters";
import { searchParams, searchParamsCache, serialize } from "@/lib/searchparams";
import FilterTendersLoadingSkeleton from "../filer-tenders-loading-skeleton";

export default function TendersFiltersLayout({ children }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <div className="space-y-6 p-4">
      <Suspense fallback={<FilterTendersLoadingSkeleton />}>
        <TendersFilters />
      </Suspense>
      {children}
    </div>
  );
}
