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
} from "lucide-react";

export default function ModernCorporate() {
  return (
    <div className="min-h-screen bg-background">
      {/* Company Overview */}
      <section id="overview" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">About TechCorp</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Founded in 2015, TechCorp has been at the forefront of digital
                innovation, serving over 10,000 businesses worldwide. We
                specialize in creating scalable, secure, and intelligent
                solutions that adapt to your business needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Clients
                  </div>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-8 text-center">
              <Globe className="mx-auto mb-4 h-16 w-16 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Global Presence</h3>
              <p className="text-muted-foreground">
                Serving clients across 50+ countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Platform Features & Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive solutions designed to meet your business objectives
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <TrendingUp className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Real-time data analytics with AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Predictive modeling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Custom dashboards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Enterprise-grade security with full compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">SOC 2 Type II</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">GDPR compliant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">End-to-end encryption</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Collaboration Tools</CardTitle>
                <CardDescription>
                  Seamless team collaboration and workflow management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Team workspaces</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-time sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">API integrations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              <CardContent className="p-6 text-center">
                <Phone className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  24/7 Support Available
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@techcorp.com</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Response within 2 hours
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Office</h3>
                <p className="text-muted-foreground">123 Business Ave</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>
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
