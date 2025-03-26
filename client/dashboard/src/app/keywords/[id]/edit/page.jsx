import KeywordForm from "@/components/forms/keyword";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function KeywordEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit Keyword"} description="Edit Keyword." />
      <KeywordForm type="edit" id={id} />
    </PageContainer>
  );
}
