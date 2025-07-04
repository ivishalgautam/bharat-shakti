"use client";

import auth from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Zod Schemas
const forgotSchema = z.object({
  email: z
    .string({ required_error: "Email is required*" })
    .email("Please enter a valid email address.")
    .min(1, { message: "Email is required*" }),
});

const resetSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required*" })
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string({
      required_error: "Please confirm your password*",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ForgotPasswordForm({ type }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(type === "forgot" ? forgotSchema : resetSchema),
  });

  const forgotMutation = useMutation({
    mutationFn: auth.forgotPassword,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Reset link sent",
        description:
          "Check your inbox for instructions to reset your password.",
      });
      router.replace("/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Request failed",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  const resetMutation = useMutation({
    mutationFn: auth.resetPassword,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Password reset successfully.",
      });
      router.replace("/login");
    },
    onError: (error) => {
      console.log({ error });
      toast({
        variant: "destructive",
        title: "Request failed",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  async function onSubmit(data) {
    type === "forgot"
      ? forgotMutation.mutate({ ...data })
      : resetMutation.mutate({ ...data, token });
  }

  return (
    <div>
      <div>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-secondary">
          {type === "forgot" ? "Forgot your password?" : "Reset your password"}
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          {type === "forgot"
            ? "Enter your email and we’ll send you a password reset link."
            : "Enter your new password below to reset your account."}
        </p>

        <p className="mt-1 text-center text-sm text-gray-600">
          {"Remember your password? "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {type === "forgot" ? (
          <div className="space-y-4 rounded-md">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 rounded-md">
            <div className="relative">
              <Label htmlFor="password">Enter new password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Enter confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          <Button
            disabled={forgotMutation.isPending || resetMutation.isPending}
            type="submit"
            className="w-full"
          >
            {(forgotMutation.isPending || resetMutation.isPending) && (
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            )}
            {type === "forgot" ? "Send reset link" : "Reset password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
