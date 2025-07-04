import TenderForm from "@/components/forms/tender";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function TenderCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create Tender"} description="Create tender." />
      <TenderForm type="create" />
    </PageContainer>
  );
}
