import { cn } from "@/lib/utils";
import { Muted } from "../ui/typography";

export default function SectionHeading({
  heading = "",
  subheading = "",
  headingClassNames = "",
  subHeadingClassNames = "",
}) {
  return (
    <div className="flex flex-col items-center">
      <h2
        className={cn(
          "text-center text-2xl font-bold text-gray-800",
          headingClassNames,
        )}
      >
        {heading}
      </h2>
      <div className="my-2 flex items-center gap-2">
        <div className="h-px w-8 bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <div className="h-px w-8 bg-primary"></div>
      </div>
      <Muted className={cn("text-balance", subHeadingClassNames)}>
        {subheading}
      </Muted>
    </div>
  );
}
