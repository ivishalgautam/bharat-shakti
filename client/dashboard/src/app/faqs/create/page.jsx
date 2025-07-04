import FAQForm from "@/components/forms/faq";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";

export default function FAQCreatePage() {
  return (
    <PageContainer>
      <Heading title={"Create FAQs"} description="Create FAQs." />
      <FAQForm />
    </PageContainer>
  );
}
