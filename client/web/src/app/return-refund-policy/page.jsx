import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { companyDetails } from "@/data/constants";

export default function ReturnRefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold">Return and Refund Policy</h1>
          <p className="mb-6 text-xl text-slate-300">
            Clear guidelines for our digital services and subscription plans
          </p>
          <Badge variant="secondary" className="bg-teal-600 text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Effective Date: 11-06-2025
          </Badge>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-6 w-6 text-teal-600" />
                Welcome to BharatshaktiTenders.com
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-slate-700">
                Thank you for choosing BharatshaktiTenders.com. We aim to
                provide accurate and timely tender information and services to
                our users. Please read our Return and Refund Policy carefully
                before subscribing to any of our services.
              </p>
            </CardContent>
          </Card>

          {/* Digital Products Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-blue-100 text-blue-800">1</Badge>
                Digital Products and Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-700">
                All services offered by BharatshaktiTenders.com, including but
                not limited to:
              </p>
              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span>Tender alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span>Document downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span>Membership plans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                  <span>Market intelligence reports</span>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-800">
                      Important Notice
                    </p>
                    <p className="text-sm text-amber-700">
                      All services are considered digital products and are
                      delivered electronically. Due to the nature of digital
                      services, we do not offer returns or refunds once the
                      service has been activated or accessed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Refundable Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-red-100 text-red-800">2</Badge>
                Non-Refundable Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-start space-x-2">
                  <XCircle className="mt-0.5 h-5 w-5 text-red-600" />
                  <p className="text-red-800">
                    Once a user subscribes to a plan and gains access to our
                    database or any digital resource, the transaction is final
                    and non-refundable, except under specific circumstances
                    outlined below.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refunds Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-green-100 text-green-800">3</Badge>
                Refunds (If Applicable)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-700">
                A refund may be considered only in the following situations:
              </p>
              <div className="mb-4 space-y-3">
                <div className="flex items-start space-x-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Duplicate payment for the same subscription plan
                  </span>
                </div>
                <div className="flex items-start space-x-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Technical error during payment, resulting in failure of
                    service activation
                  </span>
                </div>
                <div className="flex items-start space-x-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span className="text-green-800">
                    Service not delivered due to an internal issue on our end
                    (not related to user's device or internet connectivity)
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                  <p className="text-blue-800">
                    To request a refund, please contact us within{" "}
                    <strong>7 days</strong> of the transaction with proof of
                    payment and a detailed explanation of the issue.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Request Refund */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-purple-100 text-purple-800">4</Badge>
                How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-slate-700">
                To initiate a refund request, please contact our support team:
              </p>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-3 rounded-lg bg-slate-50 p-4">
                  <Mail className="h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <p className="text-xs text-slate-600">
                      {companyDetails.mail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-slate-50 p-4">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-medium text-slate-900">Phone</p>
                    <p className="text-sm text-slate-600">
                      {companyDetails.contact}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rounded-lg bg-slate-50 p-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                  <div>
                    <p className="font-medium text-slate-900">Address</p>
                    <p className="text-sm text-slate-600">
                      {companyDetails.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-slate-700">
                  We will review your request and respond within{" "}
                  <strong>5–7 business days</strong>. If approved, the refund
                  will be processed to your original method of payment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Cancellations */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-orange-100 text-orange-800">5</Badge>
                Subscription Cancellations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <p className="text-orange-800">
                  You may cancel your subscription at any time; however,
                  cancellation does not entitle you to a refund for the
                  remaining duration of the plan. Your access will continue
                  until the end of the current billing cycle.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Badge className="mr-3 bg-teal-100 text-teal-800">6</Badge>
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-slate-700">
                For any questions regarding our Return and Refund Policy, please
                contact us:
              </p>
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-6">
                <h3 className="mb-4 font-bold text-teal-900">
                  Bharatshakti Tenders
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <span className="text-teal-800">
                      {companyDetails.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-teal-600" />
                    <span className="text-teal-800">{companyDetails.mail}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-teal-600" />
                    <span className="text-teal-800">
                      {companyDetails.contact}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          {/* <div className="text-center">
            <Button className="bg-teal-600 px-8 py-3 text-white hover:bg-teal-700">
              Contact Support Team
            </Button>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2024 Bharatshakti Tenders. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
