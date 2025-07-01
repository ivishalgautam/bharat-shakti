import Section from "./layout/section";
import SectionHeading from "./layout/section-heading";

const features = [
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
    description: "Expert legal advice on tender terms and conditions.",
    icon: "⚖️",
  },
  {
    title: "Post-Bid Support",
    description: "Continued support after bid submission including follow-ups.",
    icon: "🤝",
  },
];
export default function Services() {
  return (
    <Section className="py-0 md:py-0">
      <section className="bg-gradient-to-br from-primary/70 to-secondary/80 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <SectionHeading
              heading="Services"
              headingClassNames="text-white"
              subheading="Comprehensive tender solutions to help you win more bids"
              subHeadingClassNames="text-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <div className="mb-6 text-5xl">{feature.icon}</div>
                <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                <p className="leading-relaxed text-white/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}
