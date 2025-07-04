import { companyDetails } from "@/data/constants";
import { Award, Building, Mail, MapPin, Phone, Target } from "lucide-react";
import SectionHeading from "./layout/section-heading";
import { Card, CardContent } from "./ui/card";

export default function AboutUsMinimalist() {
  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero */}
      <div className="mx-auto max-w-4xl px-4 pt-12 text-center">
        <SectionHeading
          heading="About Us"
          headingClassNames="text-4xl"
          subheading="We're transforming how businesses discover, bid on, and win
          tenders through intelligent technology and strategic insights."
        />
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-light">Our Story</h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              BharatShakti is an AI-powered tender discovery platform built to
              simplify and streamline how MSMEs, traders, and government
              suppliers engage with public procurement opportunities. Every day,
              thousands of tenders are published by various government
              departments and agencies. Yet, many promising businesses miss out
              on these valuable opportunities due to the overwhelming volume of
              data, inconsistent terminology, and the lack of a centralized,
              intelligent system to identify relevant tenders on time.
            </p>
            <p className="mb-8 leading-relaxed text-gray-600">
              At BharatShakti, we aim to solve this challenge by combining
              cutting-edge technology with deep industry insight. Our platform
              uses advanced web scraping, intelligent categorization, and
              real-time analytics to ensure that users receive timely and
              relevant tender notifications. Beyond discovery, BharatShakti also
              offers historical data insights, pricing trends, and competitor
              activity to help businesses make informed bidding decisions.
            </p>
          </div>
          <div className="relative">
            <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-8">
              <div className="text-center">
                <Building className="mx-auto mb-4 h-24 w-24 text-primary" />
                <div className="text-2xl font-bold text-gray-800">500K+</div>
                <div className="text-gray-600">Tenders Processed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mission and vision */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="transform rounded-2xl bg-white p-8 shadow-xl transition-transform hover:scale-105">
            <Target className="mb-4 h-12 w-12 text-blue-600" />
            <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
            <p className="leading-relaxed text-gray-600">
              {
                "Our vision is to empower Indian enterprises by making government procurement more accessible, efficient, and transparent. Whether you're an established supplier or a growing MSME, BharatShakti ensures that you stay ahead of the curve, never miss a deadline, and seize every opportunity that matters."
              }
            </p>
          </div>
          <div className="transform rounded-2xl bg-white p-8 shadow-xl transition-transform hover:scale-105">
            <Award className="mb-4 h-12 w-12 text-purple-600" />
            <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
            <p className="leading-relaxed text-gray-600">
              To become the global leader in tender management solutions,
              fostering economic growth through innovation, transparency, and
              strategic partnerships that benefit businesses, governments, and
              communities worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <section id="contact" className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to transform your business? Contact our team today.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <Phone className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Phone</h3>
                <p className="text-muted-foreground">
                  {companyDetails.contact}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  24/7 Support Available
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Email</h3>
                <p className="text-muted-foreground">{companyDetails.mail}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Response within 2 hours
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Office</h3>
                <p className="text-muted-foreground"></p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {companyDetails.address}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
