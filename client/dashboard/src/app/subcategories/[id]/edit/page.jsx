import SubcategoryForm from "@/components/forms/subcategory";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function SubCategoryEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit sub category"} description="Edit sub category." />
      <SubcategoryForm type="edit" id={id} />
    </PageContainer>
  );
}
