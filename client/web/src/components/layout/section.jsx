import { cn } from "@/lib/utils";
import React from "react";

export default function Section({ children, className = "" }) {
  return (
    <section className={cn("py-12 md:py-16", className)}>{children}</section>
  );
}
