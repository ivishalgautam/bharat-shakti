import KeywordForm from "@/components/forms/industry";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function IndustryEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit Industry"} description="Edit Industry." />
      <KeywordForm type="edit" id={id} />
    </PageContainer>
  );
}
