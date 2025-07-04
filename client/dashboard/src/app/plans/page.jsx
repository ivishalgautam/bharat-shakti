import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Listing from "./_component/listing";
import TableActions from "./_component/table-actions";

export const metadata = {
  title: "Plans",
};

export default async function Plans({ searchParams }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="flex items-start justify-between">
        <Heading
          title="Plans"
          description="Manage Plans (Create, Update, Delete)."
        />
        <Link
          href={"/plans/create"}
          className={cn(buttonVariants({ variant: "outline" }), "h-7")}
        >
          <Plus /> Add
        </Link>
      </div>
      <TableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}
      >
        <Listing />
      </Suspense>
    </PageContainer>
  );
}
