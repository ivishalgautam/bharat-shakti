"use client";
import Spinner from "@/components/spinner";
import ErrorMessage from "@/components/ui/error";
import invoiceMaster from "@/services/invoice-master";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ViewInvoice from "../../_component/view-invoice";

export default function ViewInvoicePage({ params: { slug } }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["invoice-masters", slug],
    queryFn: () => invoiceMaster.getById(slug),
    enabled: !!slug,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;
  console.log({ data });
  return <ViewInvoice data={data} />;
}
