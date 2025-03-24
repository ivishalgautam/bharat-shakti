import TenderForm from "@/components/forms/tender";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function TenderCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Tender"} description="Create tender." />
      <TenderForm />
    </PageContainer>
  );
}
