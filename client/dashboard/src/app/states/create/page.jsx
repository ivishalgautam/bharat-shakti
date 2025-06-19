import StateForm from "@/components/forms/state";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function StateCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create State"} description="Create state." />
      <StateForm />
    </PageContainer>
  );
}
