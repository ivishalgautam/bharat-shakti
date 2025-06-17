import LoginForm from "@/components/forms/login";
import { headers } from "next/headers";
import React from "react";

export default function LoginPage() {
  const headerList = headers();
  const referer = headerList.get("referer");
  const redirectLink = referer.includes("/register") ? "/" : referer;

  return <LoginForm redirectLink={redirectLink} />;
}
