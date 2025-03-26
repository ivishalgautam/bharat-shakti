import StateForm from "@/components/forms/state";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function StateEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit State"} description="Edit State." />
      <StateForm type="edit" id={id} />
    </PageContainer>
  );
}
