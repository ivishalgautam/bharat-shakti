import TendersFiltersLayout from "@/components/layout/tenders-filters-layout";
import AllTendersListing from "@/components/tenders/all-tenders-list";
import { Suspense } from "react";

export default function TendersPage() {
  return (
    <TendersFiltersLayout>
      <Suspense fallback={"Loading..."}>
        <AllTendersListing />
      </Suspense>
    </TendersFiltersLayout>
  );
}
