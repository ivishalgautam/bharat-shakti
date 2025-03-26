import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
