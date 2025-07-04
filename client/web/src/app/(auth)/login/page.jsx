import LoginForm from "@/components/forms/login";
import { publicRoutes } from "@/data/routes";
import { headers } from "next/headers";
import React from "react";

export default function LoginPage() {
  const headerList = headers();
  const referer = headerList.get("referer");
  const redirectLink = publicRoutes.includes(referer) ? "/" : referer;

  return <LoginForm redirectLink={redirectLink} />;
}
