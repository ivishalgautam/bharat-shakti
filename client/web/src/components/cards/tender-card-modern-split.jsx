import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRemainingDays } from "@/lib/get-remaining-days";
import { rupee } from "@/lib/Intl";

export default function TenderCardModernSplit({
  tender,
  followMutation,
  unfollowMutation,
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col md:flex-row">
        {/* Left side with key info */}
        <div className="flex-1 border-r border-border p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                {tender.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                Bid #{tender.bid_number}
              </p>
            </div>
            <Badge
              className="ml-2"
              variant={
                getRemainingDays(tender.bid_end_date_time) < 3
                  ? "destructive"
                  : "outline"
              }
            >
              {getRemainingDays(tender.bid_end_date_time) <= 0
                ? "Closed"
                : `${getRemainingDays(tender.bid_end_date_time)} days left`}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Department</span>
              <span className="text-xs text-muted-foreground">
                {tender.department || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Organisation</span>
              <span className="text-xs text-muted-foreground">
                {tender.organisation || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Office</span>
              <span className="text-xs text-muted-foreground">
                {tender.office || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Right side with financial info */}
        <div className="flex-1 p-6">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Tender Value</span>
              <span className="text-xs text-muted-foreground">
                {rupee.format(tender.tender_value)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">EMD Amount</span>
              <span className="text-xs text-muted-foreground">
                {rupee.format(tender.emd_amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Bid End Date</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(tender.bid_end_date_time), "PPP p")}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                tender.is_followed
                  ? unfollowMutation.mutate({ id: tender.id })
                  : followMutation.mutate({ tender_id: tender.id })
              }
              className={cn("w-full sm:w-auto", {
                "border-primary bg-primary/10": tender.is_followed,
              })}
            >
              <Heart
                className="mr-2 h-4 w-4"
                fill={tender.is_followed ? "red" : "none"}
              />
              {tender.is_followed ? "Followed" : "Follow"}
            </Button>
            <Link
              href={`/tenders/${tender.slug}`}
              className={cn(buttonVariants(), "w-full sm:w-auto")}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
