import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function KeywordCard({ keyword }) {
  return (
    <Link
      href={`/keywords/${keyword.slug}`}
      className="rounded-lg border border-primary bg-primary/10 p-4 text-center shadow-sm transition-colors hover:bg-gray-50"
    >
      <div className="mx-auto size-16 p-2">
        <Image
          width={100}
          height={100}
          src={`${config.file_base}/${keyword.image}`}
          alt={keyword.name}
        />
      </div>
      <div className="font-medium">{keyword.name}</div>
    </Link>
  );
}
