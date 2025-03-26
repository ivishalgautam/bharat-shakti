import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { Heading } from "@/components/ui/heading";
import PageContainer from "@/components/layout/page-container";
import TableActions from "./_component/table-actions";
import Listing from "./_component/listing";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Users",
};

export default async function Users({ searchParams }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="flex items-start justify-between">
        <Heading
          title="Authorities"
          description="Manage authorities (Create, Update, Delete)."
        />
        <Link
          href={"/authorities/create"}
          className={cn(buttonVariants({ variant: "outline" }), "h-7")}
        >
          <Plus /> Add
        </Link>
      </div>
      <TableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
      >
        <Listing />
      </Suspense>
    </PageContainer>
  );
}
