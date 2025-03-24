import KeywordForm from "@/components/forms/keyword";
import SectorForm from "@/components/forms/sector";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function KeywordCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Keyword"} description="Create keyword." />
      <KeywordForm />
    </PageContainer>
  );
}
