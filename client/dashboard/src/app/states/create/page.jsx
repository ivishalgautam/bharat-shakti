import AuthorityForm from "@/components/forms/authority-form";
import StateForm from "@/components/forms/state";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function StateCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create State"} description="Create state." />
      <StateForm />
    </PageContainer>
  );
}
