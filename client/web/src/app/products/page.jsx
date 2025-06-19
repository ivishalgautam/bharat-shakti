import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4">
      {Array.from({ length: 1000 }).map((_, ind) => (
        <Link
          key={ind}
          href={`/products/${ind + 1}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Product {ind + 1}
        </Link>
      ))}
    </div>
  );
}
