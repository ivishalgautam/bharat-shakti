"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { columns } from "../columns";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useDeleteApplication,
  useGetApplications,
  useUpdateApplication,
} from "@/mutations/application-mutation";

export default function UserListing() {
  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const router = useRouter();

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const { data, isLoading, isFetching, isError, error } =
    useGetApplications(searchParamsStr);
  const deleteMutation = useDeleteApplication(userId, closeModal);
  const updateMutation = useUpdateApplication(applicationId, searchParamsStr);

  useEffect(() => {
    if (!searchParamsStr) {
      const params = new URLSearchParams();
      params.set("page", 1);
      params.set("limit", 10);
      router.replace(`?${params.toString()}`);
    }
  }, [searchParamsStr, router]);

  if (isLoading) return <DataTableSkeleton columnCount={6} rowCount={10} />;

  if (isError) return error?.message ?? "error";

  return (
    <div className="w-full rounded-lg border-input">
      <DataTable
        columns={columns(
          updateMutation,
          setUserId,
          openModal,
          setApplicationId
        )}
        data={data?.data ?? []}
        totalItems={data?.total}
      />

      <DeleteDialog
        deleteMutation={deleteMutation}
        isOpen={isModal}
        setIsOpen={setIsModal}
      />
    </div>
  );
}

export function DeleteDialog({ isOpen, setIsOpen, deleteMutation }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={deleteMutation.mutate}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
