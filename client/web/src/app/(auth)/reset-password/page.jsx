"use client";
import ForgotPasswordForm from "@/components/forms/forgot-password";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  return <ForgotPasswordForm token={token} type="reset" />;
}
