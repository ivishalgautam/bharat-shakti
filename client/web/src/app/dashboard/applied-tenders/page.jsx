import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Suspense } from "react";
// import { Heading } from "@/components/ui/heading";
// import PageContainer from "@/components/layout/page-container";
import Listing from "./_component/listing";
import TableActions from "./_component/table-actions";

export const metadata = {
  title: "Applied tenders",
};

export default async function AppliedTendersPage({ searchParams }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <>
      {/* <div className="flex items-start justify-between">
        <Heading
          title="Applications"
          description="Manage Applications (Update, Delete)."
        />
      </div> */}
      <TableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
      >
        <Listing />
      </Suspense>
    </>
  );
}
