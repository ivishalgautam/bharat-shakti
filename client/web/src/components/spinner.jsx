import { Loader2 } from "lucide-react";
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
