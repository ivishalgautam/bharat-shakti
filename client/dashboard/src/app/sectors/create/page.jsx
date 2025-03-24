import SectorForm from "@/components/forms/sector";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function SectorCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Sector"} description="Create sector." />
      <SectorForm />
    </PageContainer>
  );
}
