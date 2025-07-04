import { companyDetails } from "@/data/constants";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for BharatshaktiTenders.com",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mb-8 text-lg font-semibold text-gray-700">
            Effective Date: 11-06-2025
          </p>

          <div className="space-y-8">
            <div>
              <p className="leading-relaxed text-gray-700">
                Welcome to <strong>BharatshaktiTenders.com</strong>{" "}
                (&quot;Website&quot;). These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our services, website,
                and any information provided by or through Bharatshakti Tenders.
              </p>
              <p className="mt-4 leading-relaxed text-gray-700">
                By accessing or using the website, you agree to be bound by
                these Terms. If you do not agree, please do not access or use
                the website.
              </p>
            </div>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                1. Company Information
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Website:</strong> https://www.bharatshaktitenders.com
                </p>
                <p>
                  <strong>Email:</strong> {companyDetails.mail}
                </p>
                <p>
                  <strong>Phone:</strong> {companyDetails.contact}
                </p>
                <p>
                  <strong>Address:</strong> {companyDetails.address}
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                2. Services Provided
              </h2>
              <p className="leading-relaxed text-gray-700">
                Bharatshakti Tenders provides information and services related
                to tenders and government procurement notices, including access
                to public tenders, bidding documents, and procurement insights.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                3. User Responsibilities
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>You agree to use the website only for lawful purposes.</li>
                <li>
                  You must not engage in any activity that disrupts or
                  interferes with the website&apos;s services.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials, if applicable.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed text-gray-700">
                All content on the website, including text, graphics, logos, and
                software, is the property of Bharatshakti Tenders or its content
                suppliers and is protected by applicable copyright and trademark
                laws.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed text-gray-700">
                Bharatshakti Tenders is not liable for any direct, indirect,
                incidental, or consequential damages arising from the use or
                inability to use the website or its services. We do not
                guarantee the completeness, accuracy, or timeliness of any
                tender information provided.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                6. Third-Party Links
              </h2>
              <p className="leading-relaxed text-gray-700">
                Our website may contain links to third-party websites. These
                links are provided for your convenience only. Bharatshakti
                Tenders does not endorse or assume responsibility for the
                content or policies of third-party sites.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                7. Modifications to the Terms
              </h2>
              <p className="leading-relaxed text-gray-700">
                We reserve the right to modify these Terms at any time. Your
                continued use of the website following any changes constitutes
                acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                8. Termination
              </h2>
              <p className="leading-relaxed text-gray-700">
                We reserve the right to terminate or suspend access to our
                website or services without prior notice for conduct that we
                believe violates these Terms or is harmful to other users or us.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                9. Governing Law and Jurisdiction
              </h2>
              <p className="leading-relaxed text-gray-700">
                These Terms are governed by the laws of India. Any disputes
                arising out of or related to the use of this website shall be
                subject to the exclusive jurisdiction of the courts in Nagpur,
                Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                10. Contact Us
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <div className="rounded-lg border bg-gray-50 p-6">
                <p className="mb-2 font-semibold text-gray-900">
                  Bharatshakti Tenders
                </p>
                <p className="mb-2 text-gray-700">{companyDetails.address}</p>
                <p className="mb-1 text-gray-700">
                  <strong>Email:</strong> {companyDetails.mail}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {companyDetails.contact}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
