import Authorities from "@/components/authorities";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/layout/section-heading";
import States from "@/components/states";
import React from "react";

export default function StatesPage() {
  return (
    <PageContainer>
      <SectionHeading heading="States" />
      <States />
    </PageContainer>
  );
}
