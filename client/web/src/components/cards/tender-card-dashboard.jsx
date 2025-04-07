import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getRemainingDays } from "@/lib/get-remaining-days";
import { rupee } from "@/lib/Intl";

export default function TenderCardDashboard({
  tender,
  followMutation,
  unfollowMutation,
}) {
  const isUrgent = getRemainingDays(tender.bid_end_date_time) < 3;
  const isClosed = getRemainingDays(tender.bid_end_date_time) <= 0;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="max-w-[70%]">
            <h3 className="line-clamp-1 text-lg font-semibold text-primary">
              {tender.name}
            </h3>
            <div className="mt-1 flex items-center">
              <p className="text-xs text-muted-foreground">
                Bid #{tender.bid_number}
              </p>
              <span className="mx-2 text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">
                {tender.department || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge
              variant={isUrgent ? "destructive" : "outline"}
              className="mb-1"
            >
              {isClosed
                ? "Closed"
                : `${getRemainingDays(tender.bid_end_date_time)} days left`}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {format(new Date(tender.bid_end_date_time), "PPP")}
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Organisation</p>
              <p className="text-right text-xs text-muted-foreground">
                {tender.organisation || "N/A"}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">Office</p>
              <p className="text-right text-xs text-muted-foreground">
                {tender.office || "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded bg-muted/40 p-2">
            <p className="text-xs font-medium">Tender Value</p>
            <p className="text-sm font-bold">
              {rupee.format(tender.tender_value)}
            </p>
          </div>

          <div className="rounded bg-muted/40 p-2">
            <p className="text-xs font-medium">EMD Amount</p>
            <p className="text-sm font-bold">
              {rupee.format(tender.emd_amount)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              tender.is_followed
                ? unfollowMutation.mutate({ id: tender.id })
                : followMutation.mutate({ tender_id: tender.id })
            }
            className={cn({ "text-primary": tender.is_followed })}
          >
            <Heart
              className="mr-1 h-4 w-4"
              fill={tender.is_followed ? "red" : "none"}
            />
            {tender.is_followed ? "Followed" : "Follow"}
          </Button>

          <Link
            href={`/tenders/${tender.slug}`}
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            View <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
