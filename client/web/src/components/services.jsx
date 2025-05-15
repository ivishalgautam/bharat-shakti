import Section from "./layout/section";
import SectionHeading from "./layout/section-heading";

export default function Services() {
  return (
    <Section>
      <div className="container px-4 md:px-6">
        <SectionHeading
          heading="Our Services"
          subheading="Comprehensive tender solutions to help you win more bids"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Tender Alerts",
              description:
                "Get real-time notifications for new tenders matching your business profile.",
              icon: "🔔",
            },
            {
              title: "Bid Preparation",
              description:
                "Expert assistance in preparing winning bid documents and proposals.",
              icon: "📝",
            },
            {
              title: "Document Verification",
              description:
                "Thorough review of your tender documents to ensure compliance.",
              icon: "✓",
            },
            {
              title: "Competitor Analysis",
              description:
                "Insights into competitor strategies and previous winning bids.",
              icon: "📊",
            },
            {
              title: "Legal Consultation",
              description:
                "Expert legal advice on tender terms and conditions.",
              icon: "⚖️",
            },
            {
              title: "Post-Bid Support",
              description:
                "Continued support after bid submission including follow-ups.",
              icon: "🤝",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm"
            >
              <div className="mb-4 text-3xl">{service.icon}</div>
              <h3 className="mb-2 text-xl font-medium">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
