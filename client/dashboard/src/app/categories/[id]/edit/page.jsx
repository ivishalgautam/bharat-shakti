import CategoryForm from "@/components/forms/category";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export default function CategoryEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit category"} description="Edit category." />
      <CategoryForm type="edit" id={id} />
    </PageContainer>
  );
}
