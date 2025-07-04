import AuthorityForm from "@/components/forms/authority-form";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function AuthorityCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Authority"} description="Create authority." />
      <AuthorityForm />
    </PageContainer>
  );
}
