"use client";
import { InvoiceMasterForm } from "@/components/forms/invoice-master-form";
import { H4 } from "@/components/ui/typography";
import React, { Suspense } from "react";

export default function CreateInvoiceMaterPage() {
  return (
    <div className="space-y-6 rounded-lg border bg-white p-8">
      <H4>Add Invoice</H4>
      <Suspense>
        <InvoiceMasterForm />
      </Suspense>
    </div>
  );
}
