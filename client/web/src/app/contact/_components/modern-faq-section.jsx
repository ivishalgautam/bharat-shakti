"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ModernFaqSection() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-12 shadow-sm">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-light text-slate-900">
          Common Questions
        </h2>
        <p className="text-slate-600">
          Everything you need to know about our Bharat Shakti platform
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          className="rounded-2xl border border-slate-100 px-6"
        >
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            How do I get started with tender bidding on your platform?
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-slate-600">
            Getting started is simple. Create your account, complete your
            company profile with necessary documentation, and our team will
            verify your information within 24-48 hours. Once approved,
            you&apos;ll have access to all available tenders matching your
            business profile.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="rounded-2xl border border-slate-100 px-6"
        >
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            What industries and types of tenders do you cover?
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-slate-600">
            We cover a comprehensive range of industries including construction,
            IT services, healthcare, education, transportation, and government
            contracts. Our platform aggregates opportunities from multiple
            sources to give you the widest possible selection of relevant
            tenders.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="rounded-2xl border border-slate-100 px-6"
        >
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            How much does your service cost?
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-slate-600">
            We offer flexible pricing plans starting from 3,000 for 3 months for
            our Standard plan. Premium plans include advanced features like bid
            analytics, competitor insights, and dedicated support. Contact our
            sales team for custom enterprise solutions tailored to your specific
            needs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="rounded-2xl border border-slate-100 px-6"
        >
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            Do you provide support with bid preparation?
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-slate-600">
            Yes, our Premium include bid preparation assistance. Our experienced
            consultants can review your proposals, provide strategic advice, and
            help optimize your submissions to increase your success rate in
            winning tenders.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
