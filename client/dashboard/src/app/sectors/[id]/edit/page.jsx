import SectorForm from "@/components/forms/sector";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function SectorEditPage({ params: { id } }) {
  return (
    <PageContainer>
      <Heading title={"Edit Sector"} description="Edit Sector." />
      <SectorForm type="edit" id={id} />
    </PageContainer>
  );
}
