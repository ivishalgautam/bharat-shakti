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
import { H3, Small } from "./ui/typography";
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
    queryFn: () => viewTenders.get(""),
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
              <div className="">
                <H3>{tenderData.organisation}</H3>
                <Badge className={"space-x-1"}>
                  <span>Bid #{tenderData.bid_number}</span>
                </Badge>
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
                  >
                    Apply Now
                  </Button>
                  {isLoading ? (
                    <Skeleton className={"h-10 w-28 bg-gray-200"} />
                  ) : (
                    <Button
                      variant="outline"
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
                      {formatDate(tenderData.dated)}
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
            className="w-full overflow-hidden"
            onValueChange={setActiveTab}
          >
            <TabsList className="scrollbar-hide flex w-full items-center justify-start overflow-x-auto overflow-y-hidden bg-primary/10 p-1 sm:w-max">
              <TabsTrigger
                value="overview"
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-white sm:text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-white sm:text-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-white sm:text-sm"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="related"
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-white sm:text-sm"
              >
                Related
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className={cn("mt-6")}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-primary text-white">
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
                            "flex flex-col gap-1 rounded-lg bg-primary/5 p-3",
                          )}
                        >
                          <p className="text-sm font-medium text-primary">
                            Department
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.department
                              ? tenderData.department
                              : "N/a"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-primary/5 p-3">
                          <p className="text-sm font-medium text-primary">
                            Organisation
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.organisation
                              ? tenderData.organisation
                              : "N/a"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-primary/5 p-3">
                          <p className="text-sm font-medium text-primary">
                            Office
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.office ? tenderData.office : "N/a"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-primary/5 p-3">
                          <p className="text-sm font-medium text-primary">
                            Consignee
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.consignee
                              ? tenderData.consignee
                              : "N/a"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-primary/5 p-3">
                          <p className="text-sm font-medium text-primary">
                            Bid Start Date & Time
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.bid_start_date_time
                              ? `${formatDate(tenderData.bid_start_date_time)} at ${formatTime(tenderData.bid_start_date_time)}`
                              : "N/a"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg bg-primary/5 p-3">
                          <p className="text-sm font-medium text-primary">
                            Bid End Date & Time
                          </p>
                          <p className={cn("font-medium")}>
                            {tenderData.dated
                              ? formatDate(tenderData.dated)
                              : "N/a"}
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-primary">
                          Qualification Requirements
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-primary">
                                Min. Average Annual Turnover
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.minimum_average_annual_turnover
                                  ? tenderData.minimum_average_annual_turnover
                                  : "N/a"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Clock3 className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-primary">
                                Years of Past Experience
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.years_of_past_experience
                                  ? tenderData.years_of_past_experience
                                  : "N/a"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <FileCheck className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-primary">
                                Evaluation Method
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.evaluation_method
                                  ? tenderData.evaluation_method
                                  : "N/a"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Award className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium text-primary">
                                EPBG Percentage
                              </p>
                              <p className={cn("font-medium")}>
                                {tenderData.epbg_percentage
                                  ? `${tenderData.epbg_percentage}%`
                                  : "N/a"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-indigo-100" />

                      <div>
                        <h3 className="mb-3 text-lg font-semibold text-primary">
                          Pre-qualification Criteria
                        </h3>
                        <div className={cn("rounded-lg bg-primary/5 p-4")}>
                          <p>
                            {tenderData.pre_qualification_criteria
                              ? tenderData.pre_qualification_criteria
                              : "N/a"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-primary text-white">
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
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4" /> States
                        </h3>
                        <div className={cn("flex flex-wrap gap-2")}>
                          {tenderData?.states?.length
                            ? tenderData.states?.map((state) => (
                                <Badge key={state.id} variant={"outline"}>
                                  {state.name}
                                </Badge>
                              ))
                            : "N/a"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4" /> Cities
                        </h3>
                        <div className={cn("flex flex-wrap gap-2")}>
                          {tenderData?.cities?.length
                            ? tenderData.cities?.map((city) => (
                                <Badge key={city.id} variant={"outline"}>
                                  {city.name}
                                </Badge>
                              ))
                            : "N/a"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                          <Briefcase className="h-4 w-4" /> Sectors
                        </h3>
                        <div className={cn("flex flex-wrap gap-2", {})}>
                          {tenderData?.sectors?.length
                            ? tenderData.sectors?.map((sector) => (
                                <Badge key={sector.id} variant={"outline"}>
                                  {sector.name}
                                </Badge>
                              ))
                            : "N/a"}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="h-4 w-4" /> Keywords
                        </h3>
                        <div className={cn("flex flex-wrap gap-2", {})}>
                          {tenderData?.keywords?.length
                            ? tenderData.keywords?.map((keyword) => (
                                <Badge key={keyword.id} variant={"outline"}>
                                  {keyword.name}
                                </Badge>
                              ))
                            : "N/a"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6 overflow-hidden border-0 shadow-lg">
                    <CardHeader className="bg-primary text-white">
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
                        <div className="rounded-full bg-teal-100 p-2">
                          <Clock className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-teal-700">
                            Bid Start Date & Time
                          </p>
                          <p className={cn("text-sm text-teal-600", {})}>
                            {tenderData.bid_start_date_time
                              ? `${formatDate(tenderData.bid_start_date_time)} at ${formatTime(tenderData.bid_start_date_time)}`
                              : "N/a"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-2">
                          <Calendar className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-700">
                            Bid End Date & Time
                          </p>
                          <p className={cn("text-sm text-emerald-600", {})}>
                            {tenderData.dated
                              ? formatDate(tenderData.dated)
                              : "N/a"}
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
                <CardHeader className="bg-primary text-white">
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
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-primary">
                          Quantity
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.quantity ? tenderData.quantity : "N/a"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-primary">
                          Unit of Measurement
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.uom ? tenderData.uom : "N/a"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-primary">
                          Number of Items
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.no_of_items
                            ? tenderData.no_of_items
                            : "N/a"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-primary">
                          Distribution
                        </p>
                        <p className={cn("font-medium", {})}>
                          {tenderData.distribution
                            ? tenderData.distribution
                            : "N/a"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-blue-100" />

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-primary">
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
                <CardHeader className="bg-primary text-white">
                  <CardTitle>Tender Documents</CardTitle>
                  <CardDescription className="">
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
                    <h3 className="mb-3 text-lg font-semibold text-primary">
                      Buyer Specification Documents
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {tenderData.buyer_specification_document?.length
                        ? tenderData.buyer_specification_document?.map(
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
                          )
                        : "Not found!"}
                    </div>
                  </div>

                  <Separator className="bg-amber-100" />

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-primary">
                      Drawings
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {tenderData?.drawing?.length
                        ? tenderData.drawing?.map((doc, index) => (
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
                          ))
                        : "Not found!"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Related Tab */}
            <TabsContent value="related" className={cn("mt-6")}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="bg-primary text-white">
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
                    <h3 className="mb-3 text-lg font-semibold text-primary">
                      Authorities
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {tenderData.authorities?.length
                        ? tenderData.authorities?.map((authority) => (
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
                          ))
                        : "Not found!"}
                    </div>
                  </div>

                  <Separator className="bg-emerald-100" />

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-primary">
                      Sectors
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {tenderData?.sectors?.length
                        ? tenderData.sectors?.map((sector) => (
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
                                  className={cn(
                                    "font-semibold text-green-700",
                                    {},
                                  )}
                                >
                                  {sector.name}
                                </h4>
                                <p
                                  className={cn("mt-1 text-sm text-green-600")}
                                >
                                  {sector.is_featured
                                    ? "Featured Sector"
                                    : "Sector"}
                                </p>
                              </CardContent>
                            </Card>
                          ))
                        : "Not found!"}
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

  const isUnsubscribed = user && user.plan_tier === "unsubscribed";
  if (shouldHideButton && !isUnsubscribed) {
    return null;
  }

  // Determine if the CTA is login or subscribe
  const isFreeUser = user?.plan_tier === "free" || isUnsubscribed;
  const isGuest = !user;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-lg p-4 backdrop-blur-sm">
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
