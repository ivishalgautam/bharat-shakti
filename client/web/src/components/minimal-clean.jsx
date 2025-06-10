import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function MinimalClean() {
  return (
    <div className="min-h-screen bg-white">
      {/* Company Overview */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Founded with a mission to simplify business technology, Clarity
              has grown from a small consultancy to a trusted partner for
              organizations worldwide. We believe that the best solutions are
              often the simplest ones.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">2018</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Why Choose Clarity
            </h2>
            <p className="text-lg text-gray-600">
              We focus on delivering measurable results through proven
              methodologies and personalized service.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Results-Driven
              </h3>
              <p className="text-gray-600">
                Every solution is designed with clear metrics and measurable
                outcomes in mind.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Security First
              </h3>
              <p className="text-gray-600">
                Built-in security measures protect your data and ensure
                compliance with industry standards.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Personal Touch
              </h3>
              <p className="text-gray-600">
                Dedicated account management ensures you always have direct
                access to our experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Business Consulting</CardTitle>
                <CardDescription>
                  Strategic guidance to optimize your operations and drive
                  growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Process optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Digital transformation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Change management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Technology Solutions</CardTitle>
                <CardDescription>
                  Custom software and infrastructure to power your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Cloud migration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">System integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Security & Compliance</CardTitle>
                <CardDescription>
                  Protect your business with comprehensive security measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Security audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Compliance management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Risk assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Ongoing Support</CardTitle>
                <CardDescription>
                  Continuous monitoring and support to ensure optimal
                  performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">24/7 monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Regular maintenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Performance optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gray-200"></div>
              <h3 className="mb-1 font-semibold text-gray-900">Leadership</h3>
              <p className="text-sm text-gray-600">15+ years experience</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gray-200"></div>
              <h3 className="mb-1 font-semibold text-gray-900">Engineering</h3>
              <p className="text-sm text-gray-600">Technical excellence</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gray-200"></div>
              <h3 className="mb-1 font-semibold text-gray-900">Consulting</h3>
              <p className="text-sm text-gray-600">Strategic expertise</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gray-200"></div>
              <h3 className="mb-1 font-semibold text-gray-900">Support</h3>
              <p className="text-sm text-gray-600">Always available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Trust & Security
            </h2>
            <p className="text-lg text-gray-600">
              Your trust is our foundation. We maintain the highest standards of
              security and compliance.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Security Standards
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ISO 27001 certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SOC 2 Type II compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>GDPR compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Regular security audits</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Our Commitment
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.9% uptime guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data privacy protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Transparent communication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Long-term partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real results from real partnerships
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-gray-700">
                  Clarity helped us reduce operational costs by 30% while
                  improving our security posture significantly.
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    Jennifer Walsh
                  </div>
                  <div className="text-gray-600">COO, Manufacturing Plus</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-gray-700">
                  The team&apos;s expertise and dedication made our digital
                  transformation seamless and successful.
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Robert Chen</div>
                  <div className="text-gray-600">CTO, Healthcare Solutions</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-gray-700">
                  Outstanding support and clear communication throughout our
                  entire project timeline.
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    Lisa Martinez
                  </div>
                  <div className="text-gray-600">
                    Director, Financial Services
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Ready to start your journey? We&apos;re here to help.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="mt-1 text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">hello@clarity.com</p>
              <p className="mt-1 text-sm text-gray-500">
                Response within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Office</h3>
              <p className="text-gray-600">New York, NY</p>
              <p className="mt-1 text-sm text-gray-500">Remote-first company</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="px-8 text-lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
