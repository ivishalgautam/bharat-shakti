import { cn } from "@/lib/utils";
import React from "react";

export default function PageContainer({ children, className = "" }) {
  return (
    <div className={cn("container py-12 md:py-16", className)}>{children}</div>
  );
}
