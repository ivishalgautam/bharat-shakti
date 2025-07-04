"use client";

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
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { toast } from "@/hooks/use-toast";
import application from "@/services/application";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "../columns";
import invoiceMaster from "@/services/invoice-master";

export default function Listing() {
  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState("");
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const router = useRouter();
  const queryClient = useQueryClient();

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["invoice-masters", searchParams],
    queryFn: () => invoiceMaster.get(searchParams),
    enabled: !!searchParams,
  });

  const deleteMutation = useMutation({
    mutationFn: () => invoiceMaster.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Application deleted successfully.",
      });

      queryClient.invalidateQueries(["invoice-masters"]);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });

  useEffect(() => {
    if (!searchParamsStr) {
      const params = new URLSearchParams();
      params.set("page", 1);
      params.set("limit", 10);
      router.replace(`?${params.toString()}`);
    }
  }, [searchParamsStr, router]);

  if (isLoading || isFetching)
    return <DataTableSkeleton columnCount={6} rowCount={10} />;

  if (isError) return error?.message ?? "error";

  return (
    <div className="rounded-lg border-input bg-white">
      <DataTable
        columns={columns(setUserId, openModal)}
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
