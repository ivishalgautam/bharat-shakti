import CityForm from "@/components/forms/city-form";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function CItyEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit City"} description="Edit City." />
      <CityForm type="edit" id={id} />
    </PageContainer>
  );
}
