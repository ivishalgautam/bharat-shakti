import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Muted } from "../ui/typography";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function KeywordCard({ keyword }) {
  return (
    <Link
      href={`/tenders?keywords=${keyword.id}`}
      className="group overflow-hidden rounded-lg border bg-white text-center shadow-sm transition-colors"
    >
      <div className="mx-auto aspect-video">
        <Image
          width={200}
          height={200}
          src={`${config.file_base}/${keyword.image}`}
          alt={keyword.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-4 font-medium">
        <span>{keyword.name}</span>
        <Muted>{keyword.tenders_count ?? 0} Tenders</Muted>
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
