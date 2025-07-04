import PlanForm from "@/components/forms/plan";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function PlanCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create plan"} description="Create plan." />
      <PlanForm />
    </PageContainer>
  );
}
