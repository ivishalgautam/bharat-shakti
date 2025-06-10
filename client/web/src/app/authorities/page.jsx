import Authorities from "@/components/authorities";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/layout/section-heading";
import React from "react";

export default function AuthoritiesPage() {
  return (
    <PageContainer>
      <SectionHeading heading="Authorities" />
      <Authorities />
    </PageContainer>
  );
}
