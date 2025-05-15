import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { rupee } from "@/lib/Intl";
import { getRemainingDays } from "@/lib/get-remaining-days";
import { useMutation } from "@tanstack/react-query";
import viewTenders from "@/services/view-tender";

export default function TenderCardPremium({
  tender,
  followMutation,
  unfollowMutation,
  user,
}) {
  const isUrgent = getRemainingDays(tender.bid_end_date_time) < 3;
  const isClosed = getRemainingDays(tender.bid_end_date_time) <= 0;

  const viewMutation = useMutation({
    mutationFn: (data) => viewTenders.create(data),
    onError: (error) => {
      console.log("View Error", error);
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground">
      <div className="bg-primary/10 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center">
              <Badge
                variant="secondary"
                className="mr-2 border-primary/20 bg-primary/10 text-primary"
              >
                Tender
              </Badge>
              <p className="text-xs text-muted-foreground">
                Bid #{tender.bid_number}
              </p>
            </div>
            <h3 className="line-clamp-2 text-lg font-bold text-primary">
              {tender?.name || tender?.tender_name}
            </h3>
          </div>
          <div className="flex">
            {user?.plan_tier === "premium" && (
              <Badge variant="" className={""}>
                <Eye size={15} className="mr-1" /> {tender.view_count}
              </Badge>
            )}

            <Badge
              className="ml-2 text-xs"
              variant={isUrgent ? "destructive" : "outline"}
            >
              {isClosed
                ? "Closed"
                : `${getRemainingDays(tender.bid_end_date_time)} days left`}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Department</p>
              <p className="text-xs text-muted-foreground">
                {tender.department || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Organisation</p>
              <p className="text-xs text-muted-foreground">
                {tender.organisation || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Office</p>
              <p className="text-xs text-muted-foreground">
                {tender.office || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Bid End Date</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(tender.bid_end_date_time), "PPP p")}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4 border-y py-3 sm:flex-row">
          <div className="flex items-center">
            <IndianRupee className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="mr-1 text-xs font-medium">Tender Value:</span>
            <span className="text-sm font-bold">
              {rupee.format(tender.tender_value)}
            </span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="mr-1 text-xs font-medium">EMD Amount:</span>
            <span className="text-sm font-bold">
              {rupee.format(tender.emd_amount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-3 sm:flex-row">
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
              strokeWidth={tender.is_followed ? "0" : "2"}
            />
            {tender.is_followed ? "Followed" : "Follow"}
          </Button>
          <Link
            href={`/tenders/${tender.slug}`}
            className={cn(buttonVariants(), "w-full sm:w-auto")}
            onClick={() =>
              user && viewMutation.mutate({ tender_id: tender.id })
            }
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
