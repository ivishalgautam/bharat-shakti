"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  inquiry_type: z.string({
    required_error: "Please select an inquiry type.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ModernContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      inquiry_type: "",
      message: "",
    },
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const createMutation = useMutation({
    mutationFn: async () => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Form submit");
        }, 2000);
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
    },
  });

  async function onSubmit(data) {
    createMutation.mutate(data);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 shadow-sm">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-light text-slate-900">
            Message Sent Successfully
          </h3>
          <p className="leading-relaxed text-slate-600">
            Thank you for reaching out. Our team will review your inquiry and
            get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="rounded-full px-8"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-primary/40 bg-primary/5 p-12 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label className="font-medium text-slate-700">Full Name</Label>
            <Input
              placeholder="Enter your name"
              className="h-12 rounded-xl border-slate-200 transition-colors focus:border-slate-400"
              {...register("name")}
            />
          </div>

          <div>
            <Label className="font-medium text-slate-700">Email Address</Label>
            <Input
              placeholder="your.email@company.com"
              className="h-12 rounded-xl border-slate-200 transition-colors focus:border-slate-400"
              {...register("email")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label className="font-medium text-slate-700">Company</Label>
            <Input
              placeholder="Your company name"
              className="h-12 rounded-xl border-slate-200 transition-colors focus:border-slate-400"
              {...register("company")}
            />
          </div>

          <div>
            <Label className="font-medium text-slate-700">Phone Number</Label>
            <Input
              placeholder="+1 (555) 000-0000"
              className="h-12 rounded-xl border-slate-200 transition-colors focus:border-slate-400"
              {...register("phone")}
            />
          </div>
        </div>

        <div>
          <Label className="font-medium text-slate-700">
            How can we help you?
          </Label>
          <Controller
            control={control}
            name="inquiry_type"
            render={({ field }) => {
              return (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-slate-400">
                    <SelectValue placeholder="Select your inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="bidding">Bidding Assistance</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="pricing">Pricing & Plans</SelectItem>
                    <SelectItem value="partnership">
                      Partnership Opportunities
                    </SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        <div>
          <Label className="font-medium text-slate-700">Tell us more</Label>
          <Textarea
            placeholder="Share details about your tender bidding needs and how we can assist you..."
            className="min-h-[140px] resize-none rounded-xl border-slate-200 transition-colors focus:border-slate-400"
            {...register("message")}
          />
        </div>

        <Button
          type="submit"
          className="group h-14 w-full rounded-xl font-medium text-white transition-all duration-200"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? (
            "Sending your message..."
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
