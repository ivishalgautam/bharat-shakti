import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { rupee } from "@/lib/Intl";
import { getRemainingDays } from "@/lib/get-remaining-days";

export default function TenderCardMinimalist({
  tender,
  followMutation,
  unfollowMutation,
}) {
  const daysLeft = getRemainingDays(tender.bid_end_date_time);
  const isUrgent = daysLeft < 3;
  const isClosed = daysLeft <= 0;

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      <div className="p-4">
        {/* Top section with status indicator */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Bid #{tender.bid_number}
          </p>
          <Badge
            variant={isUrgent ? "destructive" : "secondary"}
            className={cn("px-3 py-1", {
              "bg-red-100 text-red-800 hover:bg-red-100": isUrgent && isClosed,
              "bg-amber-100 text-amber-800 hover:bg-amber-100":
                isUrgent && !isClosed,
              "bg-green-100 text-green-800 hover:bg-green-100": !isUrgent,
            })}
          >
            {isClosed ? "Closed" : `${daysLeft} days left`}
          </Badge>
        </div>

        {/* Tender name */}
        <h3 className="mb-3 text-lg font-semibold">{tender.name}</h3>

        {/* Tender details - simplified layout */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Department:</span>
            <span>{tender.department || "N/A"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Organisation:</span>
            <span>{tender.organisation || "N/A"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Office:</span>
            <span>{tender.office || "N/A"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Bid End Date:</span>
            <span>{format(new Date(tender.bid_end_date_time), "PPP")}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-xs font-medium">
            <span className="text-muted-foreground">Tender Value:</span>
            <span>{rupee.format(tender.tender_value)}</span>
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">EMD Amount:</span>
            <span>{rupee.format(tender.emd_amount)}</span>
          </div>
        </div>

        {/* Action buttons with understated design */}
        <div className="mt-2 flex items-center justify-between border-t pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              tender.is_followed
                ? unfollowMutation.mutate({ id: tender.id })
                : followMutation.mutate({ tender_id: tender.id })
            }
            className="text-muted-foreground hover:text-primary"
          >
            <Heart
              className="mr-1 h-4 w-4"
              fill={tender.is_followed ? "currentColor" : "none"}
              stroke={tender.is_followed ? "none" : "currentColor"}
            />
            {tender.is_followed ? "Followed" : "Follow"}
          </Button>

          <Link
            href={`/tenders/${tender.slug}`}
            className="flex items-center text-sm font-medium text-primary hover:underline"
          >
            Details <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
