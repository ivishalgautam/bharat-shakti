const { Badge } = require("../ui/badge");
const { Button, buttonVariants } = require("../ui/button");
const {
  CardFooter,
  CardContent,
  CardTitle,
  CardHeader,
  Card,
} = require("../ui/card");

import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default function TenderCard({ tender, getRemainingDays }) {
  return (
    <Card key={tender.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-primary">
              {tender.name}
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
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
            <p className="text-sm font-medium">Department</p>
            <p className="text-sm text-muted-foreground">
              {tender.department || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Organisation</p>
            <p className="text-sm text-muted-foreground">
              {tender.organisation || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Office</p>
            <p className="text-sm text-muted-foreground">
              {tender.office || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Tender Value</p>
            <p className="text-sm text-muted-foreground">
              ₹{formatNumber(tender.tender_value)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">EMD Amount</p>
            <p className="text-sm text-muted-foreground">
              ₹{formatNumber(tender.emd_amount)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Bid End Date</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(tender.bid_end_date_time), "PPP p")}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/tenders/${tender.slug}`} className={buttonVariants()}>
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}

function formatNumber(value) {
  if (!value) return "0";
  return Number.parseInt(value).toLocaleString("en-IN");
}
