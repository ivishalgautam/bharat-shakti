import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Briefcase,
  IndianRupee,
  Eye,
  ListCollapse,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { rupee } from "@/lib/Intl";
import { getRemainingDays } from "@/lib/get-remaining-days";
import { useMutation } from "@tanstack/react-query";
import viewTenders from "@/services/view-tender";
import tenderService from "@/services/tender";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";

export default function TenderCardPremium({
  tender,
  followMutation,
  unfollowMutation,
  user,
}) {
  const router = useRouter();
  const isUrgent = getRemainingDays(tender.bid_end_date_time) < 3;
  const isClosed = getRemainingDays(tender.bid_end_date_time) <= 0;

  const viewMutation = useMutation({
    mutationFn: (data) => viewTenders.create(data),
    onError: (error) => {
      console.log("View Error", error);
    },
  });

  const viewCountMutation = useMutation({
    mutationFn: () => tenderService.addView(tender.id),
    onError: (error) => {
      console.log("View Error", error);
    },
  });

  const handleClick = () => {
    const navigate = () => router.push(`/tenders/${tender.slug}`);
    // return navigate();

    if (user) {
      viewMutation.mutate(
        { tender_id: tender.id },
        {
          onSuccess: () => {
            viewCountMutation.mutate(undefined, {
              onSettled: navigate,
            });
          },
          onError: () => {
            viewCountMutation.mutate(undefined, {
              onSettled: navigate,
            });
          },
        },
      );
    } else {
      viewCountMutation.mutate(undefined, {
        onSettled: navigate,
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-primary/30 bg-card text-card-foreground">
      <div className="bg-primary/10 p-6">
        <div className="space-y-2 sm:flex sm:flex-row-reverse sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex">
            {user?.plan_tier === "premium" && (
              <Badge variant="" className={"mr-2"}>
                <Eye size={15} className="mr-1" /> {tender.view_count}
              </Badge>
            )}

            <Badge
              className="text-xs"
              variant={isUrgent ? "destructive" : "outline"}
            >
              {isClosed
                ? "Closed"
                : `${getRemainingDays(tender.bid_end_date_time)} days left`}
            </Badge>
          </div>

          <div>
            <div className="mb-1 flex items-center">
              <Badge
                variant="secondary"
                className="mr-2 border-primary/20 bg-primary/10 text-primary"
              >
                BID NO #{tender.bid_number}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start">
            <ListCollapse className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Items</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="truncate text-ellipsis text-xs">
                    {tender.item_gem_arpts && tender.item_gem_arpts.length > 30
                      ? String(tender.item_gem_arpts).substring(0, 20) + "..."
                      : "N/A"}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-lg">{tender.item_gem_arpts || "N/A"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-xs text-muted-foreground"></p>
            </div>
          </div>

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
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Bid Start Date</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(tender.dated), "PPP p")}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium">Bid End Date</p>
              <p className="text-xs text-muted-foreground">
                {format(
                  new Date(
                    tender.bid_end_date_time.includes("T")
                      ? tender.bid_end_date_time
                      : tender.bid_end_date_time.split(" ").join("T"),
                  ),
                  "PPP p",
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-start gap-2 border-y py-3">
          <div className="flex items-center justify-start">
            <IndianRupee className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="mr-1 text-xs font-medium">Tender Value:</span>
            <span className="text-sm font-bold">
              {rupee.format(tender.tender_value)}
            </span>
          </div>
          <div className="flex items-center justify-start">
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
          <Button
            // href={`/tenders/${tender.slug}`}
            className={"w-full transition-transform sm:w-auto"}
            onClick={handleClick}
            disabled={viewMutation.isPending}
          >
            {viewMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "View Details"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
