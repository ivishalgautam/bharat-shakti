import CityForm from "@/components/forms/city-form";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function CityCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create City"} description="Create city." />
      <CityForm />
    </PageContainer>
  );
}
