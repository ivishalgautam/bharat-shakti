import SubcategoryForm from "@/components/forms/subcategory";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function SubCategoryCreatePage() {
  return (
    <PageContainer>
      <Heading
        title={"Create sub category"}
        description="Create sub category."
      />
      <SubcategoryForm />
    </PageContainer>
  );
}
