"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import {
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "@/mutations/category-mutation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "../columns";
import { DeleteDialog } from "./delete-dialog";

export default function Listing() {
  const [id, setId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const router = useRouter();
  const { data, isLoading, isFetching, isError, error } =
    useGetCategories(searchParamsStr);
  const deleteMutation = useDeleteCategory(() => {
    setIsModal(false);
  });

  const updateMutation = useUpdateCategory(id);

  const openModal = () => setIsModal(true);
  const handleUpdate = (data) => updateMutation.mutate(data);

  useEffect(() => {
    if (!searchParamsStr) {
      const params = new URLSearchParams();
      params.set("page", 1);
      params.set("limit", 10);
      router.replace(`?${params.toString()}`);
    }
  }, [searchParamsStr, router]);

  if (isLoading) return <DataTableSkeleton columnCount={4} rowCount={10} />;

  if (isError) return error?.message ?? "error";

  return (
    <div className="w-full rounded-lg border-input">
      <DataTable
        columns={columns(openModal, setId, handleUpdate)}
        data={data?.categories ?? []}
        totalItems={data?.total ?? 0}
      />
      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isModal}
        setIsOpen={setIsModal}
        id={id}
      />
    </div>
  );
}
