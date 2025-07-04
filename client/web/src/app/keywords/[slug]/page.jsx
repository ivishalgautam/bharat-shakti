import TendersListing from "@/components/tenders/all-tenders-list";
import TendersFilters from "@/components/tenders/tenders-filters";
import { searchParams, searchParamsCache, serialize } from "@/lib/searchparams";
import { Suspense } from "react";

export default function KeywordPage() {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <div className="container space-y-6 py-10">
      <Suspense fallback={"Loading..."}>
        <TendersFilters />
      </Suspense>

      <Suspense key={key} fallback={"Loading..."}>
        <TendersListing />
      </Suspense>
    </div>
  );
}
