import React from "react";
import { Muted } from "../ui/typography";

export default function SectionHeading({ heading = "", subheading = "" }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center font-serif text-2xl font-bold text-gray-800">
        {heading}
      </h2>
      <div className="my-2 flex items-center gap-2">
        <div className="h-px w-8 bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <div className="h-px w-8 bg-primary"></div>
      </div>
      <Muted>{subheading}</Muted>
    </div>
  );
}
