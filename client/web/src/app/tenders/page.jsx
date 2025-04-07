import AllTendersListing from "@/components/tenders/all-tenders-list";
import React, { Suspense } from "react";
import TendersFiltersLayout from "@/components/layout/tenders-filters-layout";

export default function TendersPage() {
  return (
    <TendersFiltersLayout>
      <Suspense fallback={"Loading..."}>
        <AllTendersListing />
      </Suspense>
    </TendersFiltersLayout>
  );
}
