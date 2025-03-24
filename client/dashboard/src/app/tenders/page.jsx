import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import React from "react";

export default function ProductsPage() {
  return (
    <PageContainer>
      <Heading title={"Tenders"} description="Create, Update, Delete tender." />

      <div className="flex items-center justify-start gap-4 flex-wrap">
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
    </PageContainer>
  );
}
