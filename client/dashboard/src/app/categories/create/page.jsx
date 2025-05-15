import CategoryForm from "@/components/forms/category";
import SectorForm from "@/components/forms/sector";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function CategoryCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create category"} description="Create category." />
      <CategoryForm />
    </PageContainer>
  );
}
