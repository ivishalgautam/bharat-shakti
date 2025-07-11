import Authorities from "@/components/authorities";
import PageContainer from "@/components/layout/page-container";
import SectionHeading from "@/components/layout/section-heading";

export default function AuthoritiesPage() {
  return (
    <PageContainer>
      <SectionHeading heading="Authorities" />
      <Authorities />
    </PageContainer>
  );
}
