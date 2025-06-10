"use client";

import { useState } from "react";
import { Check, CreditCard, User, Mail, Lock } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Step as StepperStep } from "./stepper";
import { useMutation, useQuery } from "@tanstack/react-query";
import plans from "@/services/plan-pricing";
import ErrorMessage from "./ui/error";
import Spinner from "./spinner";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import subscriptions from "@/services/subscription";
import { toast } from "@/hooks/use-toast";

// Stepper component for multi-step forms
function Stepper({ currentStep, steps }) {
  return (
    <div className="mb-8 flex w-full items-center justify-center">
      {steps.map((step, index) => (
        <StepperStep
          key={index}
          index={index}
          currentStep={currentStep}
          label={step}
          isLastStep={index === steps.length - 1}
        />
      ))}
    </div>
  );
}

function Step({ index, currentStep, label, isLastStep }) {
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isCompleted
              ? "bg-primary text-primary-foreground"
              : isActive
                ? "border-2 border-primary text-primary"
                : "border-2 border-muted-foreground text-muted-foreground"
          }`}
        >
          {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
        </div>
        <span
          className={`mt-1 text-xs ${
            isActive
              ? "font-medium text-primary"
              : isCompleted
                ? "text-primary"
                : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
      </div>
      {!isLastStep && (
        <div
          className={`h-0.5 w-12 sm:w-24 ${isCompleted ? "bg-primary" : "bg-muted-foreground/30"}`}
        />
      )}
    </div>
  );
}

export default function PricingSection() {
  const [duration, setDuration] = useState("1");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      plan_id: "",
      name: "",
      email: "",
      card_number: "",
      expiry_date: "",
      cvv: "",
      payment_method: "card",
    },
  });

  const paymentMethod = watch("payment_method");

  const steps = ["Payment Method", "Confirmation"];

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => plans.get(),
    queryKey: ["plans"],
  });

  const subscribeMutation = useMutation({
    mutationFn: subscriptions.create,
    onSuccess: () => {
      handleNextStep();
      toast({
        title: "Success",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
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

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data) => {
    subscribeMutation.mutate(data);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="payment_method"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  defaultValue="card"
                  className="mb-6 grid grid-cols-3 gap-4"
                  onValueChange={field.onChange}
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card-payment"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card-payment"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="upi"
                      id="upi-payment"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="upi-payment"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Image
                        src={"/icons/upi.svg"}
                        width={50}
                        height={50}
                        alt="upi"
                        className="mb-3 h-6 w-6"
                      />
                      UPI
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="netbanking"
                      id="netbanking-payment"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="netbanking-payment"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        className="mb-3 h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 8V19H21V8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 5H22V8H2V5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 12H18V16H12V12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Net Banking
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card_number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="card_number"
                      {...register("card_number")}
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input
                      id="expiry_date"
                      {...register("expiry_date")}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Complete Purchase
              </Button>
            </DialogFooter>
          </form>
        );
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Payment Successful!</h3>
              <p className="text-muted-foreground">
                Thank you for your purchase. You will receive a confirmation
                email shortly.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium">
                  {selectedPlan?.name} ({selectedPlan?.duration_in_months}{" "}
                  {selectedPlan?.duration_in_months === 1 ? "Month" : "Months"})
                </span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">
                  ₹{Number.parseFloat(selectedPlan?.price).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">{paymentMethod}</span>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full">Done</Button>
            </DialogFooter>
          </div>
        );
      default:
        return null;
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
                  className={`flex flex-col ${plan.is_popular ? "border-2 border-primary shadow-lg" : ""}`}
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
                      onClick={() => {
                        handlePlanSelect(plan);
                        setValue("plan_id", plan.id);
                      }}
                    >
                      {"Get Started"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              {selectedPlan && (
                <div className="mt-2">
                  <span className="font-medium">{selectedPlan.name} Plan</span>{" "}
                  - ₹{Number.parseFloat(selectedPlan.price).toLocaleString()}{" "}
                  for {selectedPlan.duration_in_months}{" "}
                  {selectedPlan.duration_in_months === 1 ? "month" : "months"}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <Stepper currentStep={currentStep} steps={steps} />
          <Separator className="my-4" />

          {renderStepContent()}
        </DialogContent>
      </Dialog>
    </section>
  );
}
