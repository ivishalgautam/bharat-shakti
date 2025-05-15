"use client";

import { useContext, useState } from "react";
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
  Clock3,
  IndianRupee,
  Heart,
  Lock,
  LogIn,
  ArrowUpRight,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import wishlists from "@/services/wishlist";
import { toast } from "@/hooks/use-toast";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Skeleton } from "./ui/skeleton";
import { AuthContext, useAuth } from "@/providers/auth-provider";
import application from "@/services/application";
import { fakeTenderData } from "@/data/constants";
import Spinner from "./spinner";
import Link from "next/link";
import { Small } from "./ui/typography";
import viewTenders from "@/services/view-tender";

export default function TenderDetails({ data }) {
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();
  const { user, isUserLoading } = useContext(AuthContext);
  const tenderData = user ? data : { ...data, ...fakeTenderData };

  const {
    data: viewedTenders = { data: [], total: 0 },
    isLoading: isViewedTendersLoading,
    isError: isViewedTendersError,
    error: viewedTendersError,
  } = useQuery({
    queryFn: viewTenders.get,
    queryKey: ["viewed-tenders"],
    enabled: !!user,
  });

  const hasStandardAccess =
    user && ["standard", "premium"].includes(user.plan_tier);
  const hasFreeAccess = user?.plan_tier === "free" && viewedTenders.total < 5;
  const hasViewedTender = viewedTenders.data?.some((t) => t.id === data.id);

  const { data: isFollowed, isLoading } = useQuery({
    queryFn: async () => {
      return http().get(
        `${endpoints.wishlists.getAll}/is-tender-followed/${data.id}`,
      );
    },
    queryKey: ["is-tender-followed", data.id],
    enabled: !!data.id && !!user,
  });

  const followMutation = useMutation({
    mutationFn: (data) => wishlists.create(data),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Followed.",
      });
      queryClient.invalidateQueries(["is-tender-followed", data.id]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong!",
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: ({ id }) => wishlists.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Unfollowed.",
      });
      queryClient.invalidateQueries(["is-tender-followed", data.id]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  const applyMutation = useMutation({
    mutationFn: (data) => application.create(data),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Applied successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

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

  if (isUserLoading) return <Spinner />;

  return (
    <div className="from-primary-200 min-h-screen bg-gradient-to-b to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  {tenderData.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-indigo-600">
                  <span>Bid #{tenderData.bid_number}</span>
                  <span>•</span>
                  <span>{tenderData.organisation}</span>
                </div>
              </div>
              <div className="space-y-2 text-end">
                {user?.plan_tier === "premium" && tenderData.wishlist_count && (
                  <Badge variant="outline" className={"bg-white"}>
                    {tenderData.wishlist_count ?? 0} others are tracking this
                    tender.
                  </Badge>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() =>
                      applyMutation.mutate({ tender_id: tenderData.id })
                    }
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    Apply Now
                  </Button>
                  {isLoading ? (
                    <Skeleton className={"h-10 w-28 bg-gray-200"} />
                  ) : (
                    <Button
                      variant="outline"
                      className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                      onClick={() =>
                        isFollowed
                          ? unfollowMutation.mutate({ id: tenderData.id })
                          : followMutation.mutate({ tender_id: tenderData.id })
                      }
                    >
                      <Heart
                        className="mr-2 h-4 w-4"
                        fill={isFollowed ? "red" : "none"}
                      />
                      {isFollowed ? "Followed" : "Follow"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="relative mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {/* <LoginButton {...{ user,hasStandardAccess, hasFreeAccess, hasViewedTender }} /> */}
              <Card className="border-l-4 border-l-rose-500 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-full bg-rose-100 p-2">
                    <IndianRupee className="h-5 w-5 text-rose-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-rose-600">
                      Tender Value
                    </p>
                    <p className={cn("text-xl font-semibold")}>
                      {rupee.format(tenderData.tender_value)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-full bg-amber-100 p-2">
                    <Award className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-amber-600">
                      EMD Amount
                    </p>
                    <p className={cn("text-xl font-semibold")}>
                      {rupee.format(tenderData.emd_amount)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-emerald-500 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-full bg-emerald-100 p-2">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-emerald-600">
                      Bid End Date
                    </p>
                    <p className={cn("text-xl font-semibold")}>
                      {formatDate(tenderData.bid_end_date_time)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-blue-600">
                      Delivery Days
                    </p>
                    <p className={cn("text-xl font-semibold")}>
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
            <TabsList className="grid grid-cols-2 bg-indigo-100 p-1 md:grid-cols-4 lg:w-[600px]">
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
            <TabsContent value="overview" className={cn("mt-6")}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <CardTitle>Tender Details</CardTitle>
                      <CardDescription className="text-indigo-100">
                        Key information about this tender
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative grid gap-6 p-6">
                      <LoginButton
                        {...{
                          user,
                          hasStandardAccess,
                          hasFreeAccess,
                          hasViewedTender,
                        }}
                      />
                      <div
                        className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}
                      >
                        <div
                          className={cn(
                            "flex flex-col gap-1 rounded-lg bg-blue-50 p-3",
                          )}
                        >
                          <p className="text-sm font-medium text-blue-600">
                            Department
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.department}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-purple-50 p-3">
                          <p className="text-sm font-medium text-purple-600">
                            Organisation
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.organisation}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-emerald-50 p-3">
                          <p className="text-sm font-medium text-emerald-600">
                            Office
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.office}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-amber-50 p-3">
                          <p className="text-sm font-medium text-amber-600">
                            Consignee
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.consignee}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-rose-50 p-3">
                          <p className="text-sm font-medium text-rose-600">
                            Dated
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.dated}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-cyan-50 p-3">
                          <p className="text-sm font-medium text-cyan-600">
                            Bid End Date & Time
                          </p>
                          <p className={cn("font-medium")}>
                            {formatDate(tenderData.bid_end_date_time)} at{" "}
                            {formatTime(tenderData.bid_end_date_time)}
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-indigo-700">
                          Qualification Requirements
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-3">
                            <div className="rounded-full bg-indigo-100 p-2">
                              <TrendingUp className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-indigo-600">
                                Min. Average Annual Turnover
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.minimum_average_annual_turnover}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-3">
                            <div className="rounded-full bg-purple-100 p-2">
                              <Clock3 className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-purple-600">
                                Years of Past Experience
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.years_of_past_experience}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 p-3">
                            <div className="rounded-full bg-emerald-100 p-2">
                              <FileCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-emerald-600">
                                Evaluation Method
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.evaluation_method}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 p-3">
                            <div className="rounded-full bg-amber-100 p-2">
                              <Award className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-amber-600">
                                EPBG Percentage
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.epbg_percentage}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-indigo-700">
                          Pre-qualification Criteria
                        </h3>
                        <div
                          className={cn(
                            "rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4",
                          )}
                        >
                          <p>{tenderData.pre_qualification_criteria}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                      <CardTitle>Location & Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="relative grid gap-6 p-6">
                      <LoginButton
                        {...{
                          user,
                          hasStandardAccess,
                          hasFreeAccess,
                          hasViewedTender,
                        }}
                      />
                      <div className="flex flex-col gap-2">
                        <h3 className="flex items-center gap-2 text-sm font-medium text-purple-700">
                          <MapPin className="h-4 w-4" /> States
                        </h3>
                        <div className={cn("flex flex-wrap gap-2")}>
                          {tenderData.states?.map((state) => (
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
                        <h3 className="flex items-center gap-2 text-sm font-medium text-blue-700">
                          <MapPin className="h-4 w-4" /> Cities
                        </h3>
                        <div className={cn("flex flex-wrap gap-2")}>
                          {tenderData.cities?.map((city) => (
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
                        <h3 className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                          <Briefcase className="h-4 w-4" /> Sectors
                        </h3>
                        <div className={cn("flex flex-wrap gap-2", {})}>
                          {tenderData.sectors?.map((sector) => (
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
                        <h3 className="flex items-center gap-2 text-sm font-medium text-amber-700">
                          <FileText className="h-4 w-4" /> Keywords
                        </h3>
                        <div className={cn("flex flex-wrap gap-2", {})}>
                          {tenderData.keywords?.map((keyword) => (
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

                  <Card className="mt-6 overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                      <CardTitle>Important Dates</CardTitle>
                    </CardHeader>
                    <CardContent className="relative grid gap-4 bg-gradient-to-b from-emerald-50 to-white p-6">
                      <LoginButton
                        {...{
                          user,
                          hasStandardAccess,
                          hasFreeAccess,
                          hasViewedTender,
                        }}
                      />
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-2">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-700">
                            Tender Date
                          </p>
                          <p className={cn("text-sm text-emerald-600", {})}>
                            {tenderData.dated}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-teal-100 p-2">
                          <Clock className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-teal-700">
                            Bid End Date & Time
                          </p>
                          <p className={cn("text-sm text-teal-600", {})}>
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
            <TabsContent value="specifications" className={cn("mt-6")}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardTitle>Tender Specifications</CardTitle>
                  <CardDescription className="text-blue-100">
                    Detailed specifications for this tender
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative grid gap-6 p-6">
                  <LoginButton
                    {...{
                      user,
                      hasStandardAccess,
                      hasFreeAccess,
                      hasViewedTender,
                    }}
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-blue-600">
                          Quantity
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-cyan-50 p-3">
                      <div className="rounded-full bg-cyan-100 p-2">
                        <FileText className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-cyan-600">
                          Unit of Measurement
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.uom}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-3">
                      <div className="rounded-full bg-indigo-100 p-2">
                        <FileText className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-indigo-600">
                          Number of Items
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.no_of_items}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3">
                      <div className="rounded-full bg-purple-100 p-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-purple-600">
                          Distribution
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.distribution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-blue-100" />

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-blue-700">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                        <div
                          className={cn(
                            `flex h-6 w-6 items-center justify-center rounded-full bg-red-500`,
                            {
                              "bg-green-500": tenderData.splitting_applied,
                            },
                          )}
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
                            className={cn(
                              `${
                                tenderData.splitting_applied
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`,
                            )}
                          >
                            {tenderData.splitting_applied ? "Yes" : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                        <div
                          className={cn(
                            `flex h-6 w-6 items-center justify-center rounded-full ${tenderData.mse_exemption_for_turnover ? "bg-green-500" : "bg-red-500"}`,
                          )}
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
                            className={cn(
                              `${
                                tenderData.mse_exemption_for_turnover
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`,
                            )}
                          >
                            {tenderData.mse_exemption_for_turnover
                              ? "Yes"
                              : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3">
                        <div
                          className={cn(
                            `flex h-6 w-6 items-center justify-center rounded-full ${tenderData.startup_exemption_for_turnover ? "bg-green-500" : "bg-red-500"}`,
                          )}
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
                            className={cn(
                              `${
                                tenderData.startup_exemption_for_turnover
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`,
                            )}
                          >
                            {tenderData.startup_exemption_for_turnover
                              ? "Yes"
                              : "No"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 p-3">
                        <div
                          className={cn(
                            `flex h-6 w-6 items-center justify-center rounded-full ${tenderData.bid_to_ra_enabled ? "bg-green-500" : "bg-red-500"}`,
                          )}
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
                            className={cn(
                              `${
                                tenderData.bid_to_ra_enabled
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`,
                            )}
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
            <TabsContent value="documents" className={cn("mt-6")}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <CardTitle>Tender Documents</CardTitle>
                  <CardDescription className="text-amber-100">
                    Download specification documents and drawings
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative grid gap-6 p-6">
                  <LoginButton
                    {...{
                      user,
                      hasStandardAccess,
                      hasFreeAccess,
                      hasViewedTender,
                      tab: "document",
                    }}
                  />
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-amber-700">
                      Buyer Specification Documents
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {tenderData.buyer_specification_document?.map(
                        (doc, index) => (
                          <Card
                            key={index}
                            className="flex items-center gap-3 border-0 bg-gradient-to-r from-amber-50 to-orange-50 p-3 shadow-md transition-shadow hover:shadow-lg"
                          >
                            <div className="rounded-full bg-amber-100 p-2">
                              <FileText className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-amber-700">
                                Document {index + 1}
                              </p>
                              <p
                                className={cn(
                                  "max-w-[250px] truncate text-sm text-amber-600",
                                  { "blur-sm": !user },
                                )}
                              >
                                {doc.split("\\").pop()}
                              </p>
                            </div>
                            {user && (hasFreeAccess || hasViewedTender) && (
                              <a
                                target="_blank"
                                download
                                href={`${config.file_base}${doc}`}
                                className={cn(
                                  buttonVariants({ size: "sm" }),
                                  "bg-amber-500 text-white hover:bg-amber-600",
                                )}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </a>
                            )}
                          </Card>
                        ),
                      )}
                    </div>
                  </div>

                  <Separator className="bg-amber-100" />

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-orange-700">
                      Drawings
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {tenderData.drawing?.map((doc, index) => (
                        <Card
                          key={index}
                          className="flex items-center gap-3 border-0 bg-gradient-to-r from-orange-50 to-amber-50 p-3 shadow-md transition-shadow hover:shadow-lg"
                        >
                          <div className="rounded-full bg-orange-100 p-2">
                            <FileText className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-orange-700">
                              Drawing {index + 1}
                            </p>
                            <p
                              className={cn(
                                "max-w-[250px] truncate text-sm text-orange-600",
                                { "blur-sm": !user },
                              )}
                            >
                              {doc.split("\\").pop()}
                            </p>
                          </div>
                          {user && hasStandardAccess && (
                            <a
                              target="_blank"
                              download
                              href={`${config.file_base}${doc}`}
                              className={cn(
                                buttonVariants({ size: "sm" }),
                                "bg-orange-500 text-white hover:bg-orange-600",
                              )}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Related Tab */}
            <TabsContent value="related" className={cn("mt-6")}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle>Related Entities</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Organizations and authorities related to this tender
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative grid gap-6 p-6">
                  <LoginButton
                    {...{
                      user,
                      hasStandardAccess,
                      hasFreeAccess,
                      hasViewedTender,
                    }}
                  />
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-emerald-700">
                      Authorities
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {tenderData.authorities?.map((authority) => (
                        <Card
                          key={authority.id}
                          className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg"
                        >
                          <div className="relative aspect-video bg-gradient-to-r from-emerald-400 to-green-400">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Building className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <CardContent className="bg-gradient-to-b from-emerald-50 to-white p-4">
                            <h4
                              className={cn(
                                "font-semibold text-emerald-700",
                                {},
                              )}
                            >
                              {authority.name}
                            </h4>
                            <p
                              className={cn(
                                "mt-1 text-sm text-emerald-600",
                                {},
                              )}
                            >
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
                    <h3 className="mb-3 text-lg font-semibold text-green-700">
                      Sectors
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {tenderData.sectors?.map((sector) => (
                        <Card
                          key={sector.id}
                          className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg"
                        >
                          <div className="relative aspect-video bg-gradient-to-r from-green-400 to-teal-400">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Briefcase className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <CardContent className="bg-gradient-to-b from-green-50 to-white p-4">
                            <h4
                              className={cn("font-semibold text-green-700", {})}
                            >
                              {sector.name}
                            </h4>
                            <p
                              className={cn("mt-1 text-sm text-green-600", {})}
                            >
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

function LoginButton({
  user,
  hasStandardAccess,
  hasFreeAccess,
  hasViewedTender,
  tab = "",
}) {
  // Calculate access logic
  const shouldHideButton =
    user &&
    (hasStandardAccess ||
      (tab !== "document" && (hasFreeAccess || hasViewedTender)));

  if (shouldHideButton) {
    return null;
  }

  // Determine if the CTA is login or subscribe
  const isFreeUser = user?.plan_tier === "free";
  const isGuest = !user;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-lg backdrop-blur-sm">
      <div className="flex items-center justify-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
        <div className="grow-0 rounded-full bg-red-500/30 p-2">
          <Lock className="text-red-500" size={15} />
        </div>
        <Small className="w-full">Access full tender details at no cost</Small>
        {isGuest && (
          <Link className={cn("grow-0", buttonVariants())} href={"/login"}>
            Login
            <LogIn />
          </Link>
        )}
        {isFreeUser && (
          <Link className={cn("grow-0", buttonVariants())} href={"/pricing"}>
            Subscribe
            <ArrowUpRight />
          </Link>
        )}
      </div>
    </div>
  );
}
