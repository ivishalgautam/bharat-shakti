"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Download,
  FileText,
  MapPin,
  Award,
  Briefcase,
  Building,
  FileCheck,
  TrendingUp,
  Truck,
  DollarSign,
  Clock3,
  IndianRupee,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import config from "@/config";
import { rupee } from "@/lib/Intl";

export default function TenderDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // This would normally come from an API call
  const tenderData = {
    id: "f454d157-2592-4bb6-991c-0484e3cfaa86",
    name: "Naomi Cooke",
    tender_amount: 20,
    slug: "Naomi-Cooke",
    bid_number: "591",
    dated: "1974-02-21",
    bid_end_date_time: "2004-12-24T06:49:00.000Z",
    department: "Qui molestias hic qu",
    organisation: "Pittman Farley Co",
    office: "Laboriosam doloribu",
    item_gem_parts: "",
    quantity: "222",
    uom: "Iure deserunt eius l",
    no_of_items: "27",
    minimum_average_annual_turnover: "2008",
    years_of_past_experience: "2003",
    evaluation_method: "Quod nobis anim dolo",
    emd_amount: "42",
    tender_value: "61",
    ote_lte: "lte",
    epbg_percentage: "95",
    buyer_specification_document: [
      "public\\images\\1743058561697_education.png",
      "public\\images\\1743058561700_energy.png",
      "public\\images\\1743058561701_healthcare.png",
    ],
    drawing: [
      "public\\images\\1743058561702_telecommunication.png",
      "public\\images\\1743058561703_tran_portation.png",
      "public\\images\\1743058561704_it-_ervice.png",
    ],
    consignee: "Doloribus dolor volu",
    delivery_days: "3",
    distribution: "In eiusmod quam mole",
    pre_qualification_criteria: "Excepteur doloremque",
    save_to_my_business: false,
    splitting_applied: false,
    mse_exemption_for_turnover: false,
    startup_exemption_for_turnover: false,
    bid_to_ra_enabled: false,
    authorities: [
      {
        id: "49db59d0-e8e3-40da-8043-cc68d24275e2",
        name: "Jorden Foster",
        slug: "Jorden-Foster",
        is_featured: false,
        image: ["public\\images\\1742904456536_con_truction.png"],
      },
    ],
    cities: [
      {
        id: "81cba1ec-45e8-4012-9cf1-cb1054907d0f",
        name: "Uma Riddle update",
        slug: "Uma-Riddle",
        is_featured: true,
        image: ["public\\images\\1742966410484_telecommunication.png"],
      },
    ],
    keywords: [
      {
        id: "e537aa13-59cc-4742-92da-516b4f6384ac",
        name: "Sigourney Dalton sdfds",
        slug: "Sigourney-Dalton",
        is_featured: false,
        image: ["public\\images\\1742967364247_infra_tructure.png"],
      },
    ],
    sectors: [
      {
        id: "207f6162-bcb1-4ca3-8102-153706017e1f",
        name: "Imani Paul",
        slug: "Imani-Paul",
        is_featured: false,
        image: ["public\\images\\1743057030538_con_truction.png"],
      },
    ],
    states: [
      {
        id: "505ca846-724e-4977-8145-0b67437bbc67",
        name: "Yvonne Baldwin",
        slug: "Yvonne-Baldwin",
        is_featured: true,
        image: ["public\\images\\1742968582378_con_truction.png"],
      },
    ],
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Define color classes for different categories
  const categoryColors = {
    states: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    cities: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    sectors: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    keywords: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {tenderData.name}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-indigo-600">
                  <span>Bid #{tenderData.bid_number}</span>
                  <span>•</span>
                  <span>{tenderData.organisation}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                >
                  Save Tender
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <Card className="border-l-4 border-l-rose-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-rose-100 p-2 rounded-full">
                    <IndianRupee className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-rose-600 font-medium">
                      Tender Value
                    </p>
                    <p className="text-xl font-semibold">
                      {rupee.format(tenderData.tender_value)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-amber-600 font-medium">
                      EMD Amount
                    </p>
                    <p className="text-xl font-semibold">
                      {rupee.format(tenderData.emd_amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-emerald-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-emerald-600 font-medium">
                      Bid End Date
                    </p>
                    <p className="text-xl font-semibold">
                      {formatDate(tenderData.bid_end_date_time)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-600 font-medium">
                      Delivery Days
                    </p>
                    <p className="text-xl font-semibold">
                      {tenderData.delivery_days} days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px] bg-indigo-100 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="related"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Related
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <CardTitle>Tender Details</CardTitle>
                      <CardDescription className="text-indigo-100">
                        Key information about this tender
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-blue-50">
                          <p className="text-sm text-blue-600 font-medium">
                            Department
                          </p>
                          <p className="font-medium">{tenderData.department}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-purple-50">
                          <p className="text-sm text-purple-600 font-medium">
                            Organisation
                          </p>
                          <p className="font-medium">
                            {tenderData.organisation}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-emerald-50">
                          <p className="text-sm text-emerald-600 font-medium">
                            Office
                          </p>
                          <p className="font-medium">{tenderData.office}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-amber-50">
                          <p className="text-sm text-amber-600 font-medium">
                            Consignee
                          </p>
                          <p className="font-medium">{tenderData.consignee}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-rose-50">
                          <p className="text-sm text-rose-600 font-medium">
                            Dated
                          </p>
                          <p className="font-medium">{tenderData.dated}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-cyan-50">
                          <p className="text-sm text-cyan-600 font-medium">
                            Bid End Date & Time
                          </p>
                          <p className="font-medium">
                            {formatDate(tenderData.bid_end_date_time)} at{" "}
                            {formatTime(tenderData.bid_end_date_time)}
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                          Qualification Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50">
                            <div className="bg-indigo-100 p-2 rounded-full">
                              <TrendingUp className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-indigo-600 font-medium">
                                Min. Average Annual Turnover
                              </p>
                              <p className="font-medium">
                                {tenderData.minimum_average_annual_turnover}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <Clock3 className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-purple-600 font-medium">
                                Years of Past Experience
                              </p>
                              <p className="font-medium">
                                {tenderData.years_of_past_experience}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50">
                            <div className="bg-emerald-100 p-2 rounded-full">
                              <FileCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-emerald-600 font-medium">
                                Evaluation Method
                              </p>
                              <p className="font-medium">
                                {tenderData.evaluation_method}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <Award className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm text-amber-600 font-medium">
                                EPBG Percentage
                              </p>
                              <p className="font-medium">
                                {tenderData.epbg_percentage}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                          Pre-qualification Criteria
                        </h3>
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                          <p>{tenderData.pre_qualification_criteria}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <CardTitle>Location & Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 p-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium flex items-center gap-2 text-purple-700">
                          <MapPin className="h-4 w-4" /> States
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tenderData.states.map((state) => (
                            <Badge
                              key={state.id}
                              className={`${categoryColors.states}`}
                            >
                              {state.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium flex items-center gap-2 text-blue-700">
                          <MapPin className="h-4 w-4" /> Cities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tenderData.cities.map((city) => (
                            <Badge
                              key={city.id}
                              className={`${categoryColors.cities}`}
                            >
                              {city.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium flex items-center gap-2 text-emerald-700">
                          <Briefcase className="h-4 w-4" /> Sectors
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tenderData.sectors.map((sector) => (
                            <Badge
                              key={sector.id}
                              className={`${categoryColors.sectors}`}
                            >
                              {sector.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium flex items-center gap-2 text-amber-700">
                          <FileText className="h-4 w-4" /> Keywords
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tenderData.keywords.map((keyword) => (
                            <Badge
                              key={keyword.id}
                              className={`${categoryColors.keywords}`}
                            >
                              {keyword.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6 shadow-lg border-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                      <CardTitle>Important Dates</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 p-6 bg-gradient-to-b from-emerald-50 to-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-700">
                            Tender Date
                          </p>
                          <p className="text-sm text-emerald-600">
                            {tenderData.dated}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-teal-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-teal-700">
                            Bid End Date & Time
                          </p>
                          <p className="text-sm text-teal-600">
                            {formatDate(tenderData.bid_end_date_time)} at{" "}
                            {formatTime(tenderData.bid_end_date_time)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-6">
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardTitle>Tender Specifications</CardTitle>
                  <CardDescription className="text-blue-100">
                    Detailed specifications for this tender
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-blue-600 font-medium">
                          Quantity
                        </p>
                        <p className="font-medium">{tenderData.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-50">
                      <div className="bg-cyan-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-cyan-600 font-medium">
                          Unit of Measurement
                        </p>
                        <p className="font-medium">{tenderData.uom}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-indigo-600 font-medium">
                          Number of Items
                        </p>
                        <p className="font-medium">{tenderData.no_of_items}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-purple-600 font-medium">
                          Distribution
                        </p>
                        <p className="font-medium">{tenderData.distribution}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-blue-100" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-700">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${tenderData.splitting_applied ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {tenderData.splitting_applied ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="font-medium">
                          Splitting Applied:{" "}
                          <span
                            className={
                              tenderData.splitting_applied
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {tenderData.splitting_applied ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${tenderData.mse_exemption_for_turnover ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {tenderData.mse_exemption_for_turnover ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="font-medium">
                          MSE Exemption for Turnover:{" "}
                          <span
                            className={
                              tenderData.mse_exemption_for_turnover
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {tenderData.mse_exemption_for_turnover
                              ? "Yes"
                              : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${tenderData.startup_exemption_for_turnover ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {tenderData.startup_exemption_for_turnover ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="font-medium">
                          Startup Exemption for Turnover:{" "}
                          <span
                            className={
                              tenderData.startup_exemption_for_turnover
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {tenderData.startup_exemption_for_turnover
                              ? "Yes"
                              : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${tenderData.bid_to_ra_enabled ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {tenderData.bid_to_ra_enabled ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="font-medium">
                          Bid to RA Enabled:{" "}
                          <span
                            className={
                              tenderData.bid_to_ra_enabled
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {tenderData.bid_to_ra_enabled ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <CardTitle>Tender Documents</CardTitle>
                  <CardDescription className="text-amber-100">
                    Download specification documents and drawings
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-amber-700">
                      Buyer Specification Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tenderData.buyer_specification_document.map(
                        (doc, index) => (
                          <Card
                            key={index}
                            className="flex items-center p-3 gap-3 border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-amber-50 to-orange-50"
                          >
                            <div className="bg-amber-100 p-2 rounded-full">
                              <FileText className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-amber-700">
                                Document {index + 1}
                              </p>
                              <p className="text-sm text-amber-600 truncate max-w-[250px]">
                                {doc.split("\\").pop()}
                              </p>
                            </div>
                            <a
                              target="_blank"
                              download
                              href={`${config.file_base}/${doc}`}
                              className={cn(
                                buttonVariants({ size: "sm" }),
                                "bg-amber-500 hover:bg-amber-600 text-white"
                              )}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Card>
                        )
                      )}
                    </div>
                  </div>

                  <Separator className="bg-amber-100" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-700">
                      Drawings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tenderData.drawing.map((doc, index) => (
                        <Card
                          key={index}
                          className="flex items-center p-3 gap-3 border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-orange-50 to-amber-50"
                        >
                          <div className="bg-orange-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-orange-700">
                              Drawing {index + 1}
                            </p>
                            <p className="text-sm text-orange-600 truncate max-w-[250px]">
                              {doc.split("\\").pop()}
                            </p>
                          </div>
                          <a
                            target="_blank"
                            download
                            href={`${config.file_base}/${doc}`}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "bg-orange-500 hover:bg-orange-600 text-white"
                            )}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Related Tab */}
            <TabsContent value="related" className="mt-6">
              <Card className="shadow-lg border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle>Related Entities</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Organizations and authorities related to this tender
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-emerald-700">
                      Authorities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tenderData.authorities.map((authority) => (
                        <Card
                          key={authority.id}
                          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-gradient-to-r from-emerald-400 to-green-400 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Building className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <CardContent className="p-4 bg-gradient-to-b from-emerald-50 to-white">
                            <h4 className="font-semibold text-emerald-700">
                              {authority.name}
                            </h4>
                            <p className="text-sm text-emerald-600 mt-1">
                              {authority.is_featured
                                ? "Featured Authority"
                                : "Authority"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-emerald-100" />

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-700">
                      Sectors
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tenderData.sectors.map((sector) => (
                        <Card
                          key={sector.id}
                          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video bg-gradient-to-r from-green-400 to-teal-400 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Briefcase className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <CardContent className="p-4 bg-gradient-to-b from-green-50 to-white">
                            <h4 className="font-semibold text-green-700">
                              {sector.name}
                            </h4>
                            <p className="text-sm text-green-600 mt-1">
                              {sector.is_featured
                                ? "Featured Sector"
                                : "Sector"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
