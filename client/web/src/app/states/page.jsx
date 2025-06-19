import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/layout/section-heading";
import States from "@/components/states";

export default function StatesPage() {
  return (
    <PageContainer>
      <SectionHeading heading="States" />
      <States />
    </PageContainer>
  );
}
