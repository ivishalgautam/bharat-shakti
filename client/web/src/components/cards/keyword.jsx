import config from "@/config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Muted } from "../ui/typography";

export default function IndustryCard({ industry }) {
  return (
    <Link
      href={`/tenders?industries=${industry.id}`}
      className="group overflow-hidden rounded-lg border bg-white text-center shadow-sm transition-colors"
    >
      <div className="mx-auto aspect-video">
        <Image
          width={200}
          height={200}
          src={`${config.file_base}${industry.image}`}
          alt={industry.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-4 font-medium">
        <span className="capitalize">{industry.name}</span>
        <Muted>{industry.tenders_count ?? 0} Tenders</Muted>
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
