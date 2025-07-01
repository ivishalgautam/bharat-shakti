import ForgotPasswordForm from "@/components/forms/forgot-password";
import React, { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm type="forgot" />
    </Suspense>
  );
}
