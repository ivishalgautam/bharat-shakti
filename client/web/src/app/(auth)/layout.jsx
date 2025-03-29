import AuthLayout from "@/components/layout/auth-layout";
import React from "react";

export default function LayoutPage({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}
