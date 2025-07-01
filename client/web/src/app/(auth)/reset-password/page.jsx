"use client";
import ForgotPasswordForm from "@/components/forms/forgot-password";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm type="reset" />
    </Suspense>
  );
}
