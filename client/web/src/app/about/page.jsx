import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, TrendingUp, Users, Eye, Lightbulb } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "About Us",
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Bharat<span className="text-primary">Shakti</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            An AI-powered tender discovery platform built to simplify and
            streamline how MSMEs, traders, and government suppliers engage with
            public procurement opportunities.
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center">
              <Target className="mr-3 h-8 w-8 text-red-500" />
              <h2 className="text-3xl font-bold text-gray-900">
                The Challenge
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Every day, thousands of tenders are published by various
              government departments and agencies. Yet, many promising
              businesses miss out on these valuable opportunities due to the
              overwhelming volume of data, inconsistent terminology, and the
              lack of a centralized, intelligent system to identify relevant
              tenders on time.
            </p>
          </CardContent>
        </Card>

        {/* Our Solution */}
        <Card className="mb-12 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center">
              <Zap className="mr-3 h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
            </div>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              At BharatShakti, we aim to solve this challenge by combining
              cutting-edge technology with deep industry insight. Our platform
              uses advanced web scraping, intelligent categorization, and
              real-time analytics to ensure that users receive timely and
              relevant tender notifications.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-6 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 font-semibold text-gray-900">
                  Historical Data Insights
                </h3>
                <p className="text-sm text-gray-600">
                  Access comprehensive historical data to understand market
                  patterns
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-6 text-center">
                <Target className="mx-auto mb-4 h-12 w-12 text-green-600" />
                <h3 className="mb-2 font-semibold text-gray-900">
                  Pricing Trends
                </h3>
                <p className="text-sm text-gray-600">
                  Analyze pricing trends to make competitive bids
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 font-semibold text-gray-900">
                  Competitor Activity
                </h3>
                <p className="text-sm text-gray-600">
                  Monitor competitor activity to stay ahead in the market
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Vision */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center">
              <Eye className="mr-3 h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Our vision is to empower Indian enterprises by making government
              procurement more accessible, efficient, and transparent. Whether
              you&apos;re an established supplier or a growing MSME,
              BharatShakti ensures that you stay ahead of the curve, never miss
              a deadline, and seize every opportunity that matters.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Lightbulb className="mr-2 h-4 w-4" />
                Accessible
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="mr-2 h-4 w-4" />
                Efficient
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Eye className="mr-2 h-4 w-4" />
                Transparent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
