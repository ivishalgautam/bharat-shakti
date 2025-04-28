import TendersFiltersLayout from "@/components/layout/tenders-filters-layout";
import React, { Suspense } from "react";
import TendersListing from "../_components/tenders-listing";

export default function ViewedTenders() {
  return (
    <TendersFiltersLayout>
      <Suspense fallback={"Loading..."}>
        <TendersListing type={"viewed"} />
      </Suspense>
    </TendersFiltersLayout>
  );
}
