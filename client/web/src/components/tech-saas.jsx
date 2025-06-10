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
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Lock,
  Globe,
  Zap,
  Code,
  Database,
  Cloud,
} from "lucide-react";

export default function TechSaaS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Key Features */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-blue-500/30 bg-blue-500/20 text-blue-300">
              Core Features
            </Badge>
            <h2 className="mb-4 text-4xl font-bold">
              Everything You Need to Scale
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Comprehensive AI-powered tools designed for enterprise performance
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Intelligent Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-driven insights with predictive modeling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Real-time dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Anomaly detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Custom ML models</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Zero-Trust Security</CardTitle>
                <CardDescription className="text-gray-400">
                  Military-grade security with compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Biometric authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Audit trails</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle>API-First Architecture</CardTitle>
                <CardDescription className="text-gray-400">
                  Seamless integrations and extensibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">RESTful APIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">GraphQL support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Webhook automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team & Expertise */}
      <section className="bg-black/20 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-purple-500/30 bg-purple-500/20 text-purple-300">
              World-Class Team
            </Badge>
            <h2 className="mb-4 text-4xl font-bold">Built by AI Pioneers</h2>
            <p className="text-lg text-gray-300">
              Our team combines decades of experience from leading tech
              companies
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="mb-2 font-semibold">AI Research</h3>
              <p className="text-sm text-gray-400">
                PhD researchers from Stanford, MIT
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                <Code className="h-10 w-10" />
              </div>
              <h3 className="mb-2 font-semibold">Engineering</h3>
              <p className="text-sm text-gray-400">
                Ex-Google, Meta, OpenAI engineers
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="mb-2 font-semibold">Security</h3>
              <p className="text-sm text-gray-400">
                Former NSA cybersecurity experts
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="mb-2 font-semibold">Product</h3>
              <p className="text-sm text-gray-400">
                Enterprise product veterans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-red-500/30 bg-red-500/20 text-red-300">
              Enterprise Security
            </Badge>
            <h2 className="mb-4 text-4xl font-bold">Security-First Approach</h2>
            <p className="text-lg text-gray-300">
              Built with enterprise-grade security from the ground up
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardHeader>
                <Lock className="mb-2 h-8 w-8 text-red-400" />
                <CardTitle>Advanced Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>AES-256 encryption at rest</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>TLS 1.3 in transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Hardware security modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Continuous monitoring</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardHeader>
                <Award className="mb-2 h-8 w-8 text-yellow-400" />
                <CardTitle>Compliance Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>ISO 27001/27017/27018</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>GDPR & CCPA compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>FedRAMP authorized</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-black/20 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-green-500/30 bg-green-500/20 text-green-300">
              Customer Success
            </Badge>
            <h2 className="mb-4 text-4xl font-bold">Transforming Industries</h2>
            <p className="text-lg text-gray-300">
              See how leading companies leverage NexusAI
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-lg">
                  NexusAI reduced our processing time by 85% and increased
                  accuracy to 99.7%
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">Alex Thompson</div>
                  <div className="text-gray-400">CTO, FinanceFlow</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-lg">
                  The AI insights helped us identify $2M in cost savings within
                  3 months
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">Maria Garcia</div>
                  <div className="text-gray-400">VP Operations, RetailMax</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-lg">
                  Seamless integration and world-class support made adoption
                  effortless
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold">David Kim</div>
                  <div className="text-gray-400">
                    Head of Engineering, TechStart
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4 border-blue-500/30 bg-blue-500/20 text-blue-300">
              Get Started
            </Badge>
            <h2 className="mb-4 text-4xl font-bold">Ready to Transform?</h2>
            <p className="text-lg text-gray-300">
              Join thousands of companies already using NexusAI
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Phone className="mx-auto mb-4 h-8 w-8 text-blue-400" />
                <h3 className="mb-2 font-semibold">Sales</h3>
                <p className="text-gray-300">+1 (555) AI-NEXUS</p>
                <p className="mt-1 text-sm text-gray-400">
                  Enterprise Solutions
                </p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto mb-4 h-8 w-8 text-purple-400" />
                <h3 className="mb-2 font-semibold">Support</h3>
                <p className="text-gray-300">support@nexusai.com</p>
                <p className="mt-1 text-sm text-gray-400">
                  24/7 Technical Support
                </p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-black/40 text-white backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MapPin className="mx-auto mb-4 h-8 w-8 text-green-400" />
                <h3 className="mb-2 font-semibold">Headquarters</h3>
                <p className="text-gray-300">Silicon Valley, CA</p>
                <p className="mt-1 text-sm text-gray-400">
                  Global Offices Available
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-lg hover:from-blue-600 hover:to-purple-700"
            >
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
