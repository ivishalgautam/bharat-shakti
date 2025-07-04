import PlanForm from "@/components/forms/plan";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function PlanEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit Plan"} description="Edit Plan." />
      <PlanForm type="edit" id={id} />
    </PageContainer>
  );
}
