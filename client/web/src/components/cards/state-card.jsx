import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ImageWithFallback from "../image-with-fallback";
import { Button } from "../ui/button";
import { Muted } from "../ui/typography";

export default function StateCard({ state }) {
  return (
    <Link
      href={`/tenders?states=${state.id}`}
      className="min-h-56 w-full overflow-hidden rounded-lg border bg-card text-center shadow-sm transition-colors hover:border-primary"
    >
      <div className="mx-auto aspect-video overflow-hidden p-2">
        <ImageWithFallback
          width={150}
          height={150}
          src={state.image}
          alt={state.name}
          className="h-full w-full object-contain object-center mix-blend-multiply drop-shadow-xl transition-transform group-hover:scale-110"
        />
      </div>
      <div className="bg-gray-50 p-4 font-medium">
        <span className="capitalize">{state.name}</span>
        <Muted>{state.tenders_count ?? 0} Tenders</Muted>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="mt-2 h-8 border-none bg-transparent"
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
