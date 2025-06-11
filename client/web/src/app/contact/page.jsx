import SectionHeading from "@/components/layout/section-heading";
import ModernContactForm from "./_components/modern-contact-form";
import ModernContactInfo from "./_components/modern-contact-info";
import ModernFaqSection from "./_components/modern-faq-section";

export const metadata = {
  title: "Contact Us | Bharat Shaktii",
  description:
    "Get in touch with our tender bidding experts for assistance with your bidding needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="mb-20 text-center">
            <SectionHeading
              heading="Let's Connect"
              headingClassNames="text-4xl"
            />
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl">
              Ready to transform your tender bidding experience? Our experts are
              here to guide you every step of the way.
            </p>
          </div>

          {/* Main Content */}
          <div className="mb-20 grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <ModernContactInfo />
            </div>
            <div className="lg:col-span-3">
              <ModernContactForm />
            </div>
          </div>

          {/* FAQ Section */}
          <ModernFaqSection />
        </div>
      </div>
    </div>
  );
}
