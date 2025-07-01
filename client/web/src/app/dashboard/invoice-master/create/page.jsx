"use client";
import { InvoiceMasterForm } from "@/components/forms/invoice-master-form";
import { H4 } from "@/components/ui/typography";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function CreateInvoiceMaterPage() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("aid");

  return (
    <div className="space-y-6 rounded-lg border bg-white p-8">
      <H4>Add Invoice</H4>

      <InvoiceMasterForm applicationId={applicationId} />
    </div>
  );
}
