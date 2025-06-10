import Industries from "@/components/industries";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/layout/section-heading";
import React from "react";

export default function IndustriesPage() {
  return (
    <PageContainer>
      <SectionHeading heading="Industries" />
      <Industries />
    </PageContainer>
  );
}
