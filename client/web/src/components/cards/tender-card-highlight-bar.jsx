import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRemainingDays } from "@/lib/get-remaining-days";
import { rupee } from "@/lib/Intl";

export default function TenderCardHighlightBar({
  tender,
  followMutation,
  unfollowMutation,
}) {
  const isUrgent = getRemainingDays(tender.bid_end_date_time) < 3;
  const isClosed = getRemainingDays(tender.bid_end_date_time) <= 0;

  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Status indicator bar */}
      <div
        className={cn("h-1 w-full", isUrgent ? "bg-destructive" : "bg-primary")}
      />

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold text-primary">
              {tender.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Bid #{tender.bid_number}
            </p>
          </div>
          <Badge
            variant={isUrgent ? "destructive" : "outline"}
            className="ml-2 whitespace-nowrap"
          >
            {isClosed
              ? "Closed"
              : `${getRemainingDays(tender.bid_end_date_time)} days left`}
          </Badge>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-2">
          <div>
            <p className="text-xs font-medium">Department</p>
            <p className="truncate text-xs text-muted-foreground">
              {tender.department || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Organisation</p>
            <p className="truncate text-xs text-muted-foreground">
              {tender.organisation || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Office</p>
            <p className="truncate text-xs text-muted-foreground">
              {tender.office || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Bid End Date</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(tender.bid_end_date_time), "PPP p")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <span className="text-xs font-medium">Tender Value:</span>
            <span className="text-xs font-bold">
              {rupee.format(tender.tender_value)}
            </span>
            <span className="ml-2 text-xs font-medium">EMD:</span>
            <span className="text-xs font-bold">
              {rupee.format(tender.emd_amount)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                tender.is_followed
                  ? unfollowMutation.mutate({ id: tender.id })
                  : followMutation.mutate({ tender_id: tender.id })
              }
              className={cn({
                "border-primary bg-primary/10": tender.is_followed,
              })}
            >
              <Heart
                className="h-4 w-4"
                fill={tender.is_followed ? "red" : "none"}
              />
            </Button>
            <Link
              href={`/tenders/${tender.slug}`}
              className={cn(buttonVariants({ size: "sm" }))}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
