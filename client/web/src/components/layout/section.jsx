import { cn } from "@/lib/utils";

export default function Section({ children, className = "" }) {
  return (
    <section className={cn("min-h-[90vh] py-12 md:py-16", className)}>
      {children}
    </section>
  );
}
