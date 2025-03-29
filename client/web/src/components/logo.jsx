import { Building2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Building2 className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">BharatShakti</span>
    </Link>
  );
}
