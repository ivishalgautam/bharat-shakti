"use client";
import StateForm from "@/components/forms/state";
import TenderForm from "@/components/forms/tender";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { useUpdateTender } from "@/mutations/tender-mutation";
import { useRouter } from "next/navigation";
import React from "react";

export default function TenderEditPage({ params: { id } }) {
  const router = useRouter();
  const updateMutation = useUpdateTender(id, () => {
    router.back();
  });

  return (
    <PageContainer>
      <Heading title={"Edit State"} description="Edit State." />
      <TenderForm type="edit" id={id} updateMutation={updateMutation} />
    </PageContainer>
  );
}
