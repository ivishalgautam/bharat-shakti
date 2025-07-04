import IndustryForm from "@/components/forms/industry";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function IndustryCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Industry"} description="Create Industry." />
      <IndustryForm />
    </PageContainer>
  );
}
