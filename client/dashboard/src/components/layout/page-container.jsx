import { cn } from "@/lib/utils";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function PageContainer({ children, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-lg h-full space-y-2 bg-white border p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
