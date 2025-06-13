"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import plans from "@/services/plan-pricing";
import ErrorMessage from "./ui/error";
import Spinner from "./spinner";
import { toast } from "@/hooks/use-toast";
import payments from "@/services/payment";
import { useAuth } from "@/providers/auth-provider";

// Razorpay script loader utility
export const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

export default function PricingSection() {
  const [duration, setDuration] = useState("3");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => plans.get(),
    queryKey: ["plans"],
  });

  const createOrderMutation = useMutation({
    mutationFn: (planData) => payments.create(planData),
    onSuccess: ({ order }) => {
      handleRazorpayPayment(order);
    },
    onError: (error) => {
      setIsProcessingPayment(false);
      setSelectedPlan(null);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Failed to create payment order. Please try again.",
      });
    },
  });

  const veirfyOrderMutation = useMutation({
    mutationFn: (planData) => payments.verify(planData),
    onSuccess: (data) => {
      setIsProcessingPayment(false);
      toast({
        title: "Payment Successful!",
        description: `Successfully subscribed to ${selectedPlan?.name} plan. You will receive a confirmation email shortly.`,
      });
      setSelectedPlan(null);
    },
    onError: (error) => {
      setIsProcessingPayment(false);
      setSelectedPlan(null);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Failed to veirfy payment order. Please try again.",
      });
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  // Filter plans by duration
  const getPlans = (duration) => {
    return (
      data?.plans?.filter(
        (plan) => plan.duration_in_months.toString() === duration,
      ) ?? []
    );
  };

  // Calculate the original price before discount
  const calculateOriginalPrice = (price, discountPercentage) => {
    const priceNum = Number.parseFloat(price);
    const discountNum = Number.parseFloat(discountPercentage);
    return priceNum / (1 - discountNum / 100);
  };

  // Handle plan selection and payment initiation
  const handlePlanSelect = async (plan) => {
    try {
      setSelectedPlan(plan);
      setIsProcessingPayment(true);

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const scriptLoaded = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js",
        );
        if (!scriptLoaded) {
          setIsProcessingPayment(false);
          setSelectedPlan(null);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load payment gateway. Please try again.",
          });
          return;
        }
      }

      // Create payment order
      createOrderMutation.mutate({
        plan_id: plan.id,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      setIsProcessingPayment(false);
      setSelectedPlan(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
      });
    }
  };

  const handleRazorpayPayment = async (orderData) => {
    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Bharat Shakti Tenders",
        description: `${selectedPlan?.name} Plan - ${selectedPlan?.duration_in_months} Month(s)`,
        order_id: orderData.id,
        handler: function (razorpayResponse) {
          // handlePaymentSuccess(response);
          veirfyOrderMutation.mutate({
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            razorpay_signature: razorpayResponse.razorpay_signature,
          });
        },
        prefill: {
          name: `${user?.first_name} ${user?.last_name}` || "",
          email: user?.user_email || "",
          contact: user?.mobile_number || "",
        },
        theme: {
          color: "#008080",
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            setSelectedPlan(null);
            toast({
              variant: "destructive",
              title: "Payment Cancelled",
              description:
                "Payment was cancelled. Please try again if you want to subscribe.",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay payment error:", error);
      setIsProcessingPayment(false);
      setSelectedPlan(null);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
      });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              {
                "Choose the perfect plan for your needs. Always know what you'll pay."
              }
            </p>
          </div>

          <Tabs
            defaultValue="3"
            className="w-full max-w-3xl"
            onValueChange={setDuration}
          >
            <TabsList className="grid w-full grid-cols-3 border border-primary/30 bg-primary/5">
              {["3", "6", "12"].map((month) => (
                <TabsTrigger
                  className="text-black data-[state=active]:bg-primary data-[state=active]:text-white"
                  key={month}
                  value={month}
                >
                  {month} Month
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {getPlans(duration).map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col ${plan.is_popular ? "border-2 border-primary shadow-lg" : ""}`}
                >
                  {plan.is_popular && (
                    <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-start text-xl">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-start">
                      {plan.plan_tier === "standard"
                        ? "For individuals and small teams"
                        : "For businesses with advanced needs"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        ₹{Number.parseFloat(plan.price).toLocaleString()}
                      </span>
                      {Number.parseFloat(plan.discount_percentage) > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹
                          {calculateOriginalPrice(
                            plan.price,
                            plan.discount_percentage,
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-start">
                      {Number.parseFloat(plan.discount_percentage) > 0 && (
                        <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Save {plan.discount_percentage}%
                        </span>
                      )}
                    </div>
                    <ul className="mt-6 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature.key}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handlePlanSelect(plan)}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment && selectedPlan?.id === plan.id ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4" />
                          Processing...
                        </>
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
