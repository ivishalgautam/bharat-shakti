"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import { DeleteDialog } from "./delete-dialog";
import {
  useDeleteSector,
  useGetSectors,
  useUpdateSector,
} from "@/mutations/sector-mutation";

export default function Listing() {
  const [id, setId] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const router = useRouter();
  const { data, isLoading, isFetching, isError, error } =
    useGetSectors(searchParamsStr);
  const deleteMutation = useDeleteSector(() => {
    setIsModal(false);
  });
  console.log({ data });

  const updateMutation = useUpdateSector(id);

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
  console.log({ isModal });
  if (isLoading || isFetching)
    return <DataTableSkeleton columnCount={4} rowCount={10} />;

  if (isError) return error?.message ?? "error";

  return (
    <div className="w-full rounded-lg border-input">
      <DataTable
        columns={columns(openModal, setId, handleUpdate)}
        data={data?.sectors ?? []}
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
