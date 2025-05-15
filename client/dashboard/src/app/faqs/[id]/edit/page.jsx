import FAQForm from "@/components/forms/faq";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function FAQEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit FAQs"} description="Edit FAQs." />
      <FAQForm type="edit" id={id} />
    </PageContainer>
  );
}
