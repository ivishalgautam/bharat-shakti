import AuthorityForm from "@/components/forms/authority-form";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function AuthorityEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit Authority"} description="Edit authority." />
      <AuthorityForm type="edit" id={id} />
    </PageContainer>
  );
}
