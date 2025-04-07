const { Badge } = require("../ui/badge");
const { Button, buttonVariants } = require("../ui/button");
const {
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
  Card,
} = require("../ui/card");

import { getRemainingDays } from "@/lib/get-remaining-days";
import { rupee } from "@/lib/Intl";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TenderCard({
  tender,
  followMutation,
  unfollowMutation,
}) {
  return (
    <Card key={tender.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-primary">
              {tender.name}
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Bid #{tender.bid_number}
            </p>
          </div>
          <Badge
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
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-medium">Department</p>
            <p className="text-xs text-muted-foreground">
              {tender.department || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Organisation</p>
            <p className="text-xs text-muted-foreground">
              {tender.organisation || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Office</p>
            <p className="text-xs text-muted-foreground">
              {tender.office || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Tender Value</p>
            <p className="text-xs text-muted-foreground">
              {rupee.format(tender.tender_value)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">EMD Amount</p>
            <p className="text-xs text-muted-foreground">
              {rupee.format(tender.emd_amount)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">Bid End Date</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(tender.bid_end_date_time), "PPP p")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            tender.is_followed
              ? unfollowMutation.mutate({ id: tender.id })
              : followMutation.mutate({ tender_id: tender.id })
          }
          className={cn({ "border-primary bg-primary/40": tender.is_followed })}
        >
          <Heart className="" fill={tender.is_followed ? "red" : null} />{" "}
          {tender.is_followed ? "Followed" : "Follow"}
        </Button>
        <Link href={`/tenders/${tender.slug}`} className={buttonVariants()}>
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
