import { cn } from "@/lib/utils";
import React from "react";

export default function PageContainer({ children, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow-md space-y-2 h-[calc(100dvh-80px)]",
        className
      )}
    >
      {children}
    </div>
  );
}
