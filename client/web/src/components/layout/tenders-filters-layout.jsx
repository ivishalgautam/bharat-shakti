import { searchParams, searchParamsCache, serialize } from "@/lib/searchparams";
import { Suspense } from "react";
import FilterTendersLoadingSkeleton from "../filer-tenders-loading-skeleton";
import TendersFilters from "../tenders/tenders-filters";

export default function TendersFiltersLayout({ children }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <div className="space-y-6 p-4">
      <Suspense fallback={<FilterTendersLoadingSkeleton />} key={key}>
        <TendersFilters />
      </Suspense>
      {children}
    </div>
  );
}
