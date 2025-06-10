import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Muted } from "../ui/typography";

export default function AuthorityCard({ authority }) {
  return (
    <Link
      href={`/tenders?authorities=${authority.id}`}
      className="space-y-2 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-primary hover:bg-primary/10"
    >
      <figure className="aspect-square size-32 w-full">
        <Image
          width={200}
          height={200}
          src={`${config.file_base}${authority.image}`}
          alt={authority.name}
          className="h-full w-full rounded-sm object-cover object-center"
        />
      </figure>
      <div className="flex flex-col items-center justify-center font-medium">
        <span className="capitalize">{authority.name}</span>
        <Muted>{authority.tenders_count ?? 0} Tenders</Muted>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="mt-2"
          effect="expandIcon"
          icon={ArrowRight}
          iconPlacement="right"
        >
          View tenders
        </Button>
      </div>
    </Link>
  );
}
