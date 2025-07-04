import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { differenceInDays, parseISO } from "date-fns";
import { Calendar, Crown } from "lucide-react";

export default function SubscriptionCard({ subscription }) {
  const daysRemaining = differenceInDays(
    parseISO(subscription.end_date),
    new Date(),
  );
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="min-h-56 w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <CardTitle className="capitalize">
              {subscription.plan_tier} Plan
            </CardTitle>
          </div>
          <Badge
            variant={
              subscription.status === "active" ? "default" : "destructive"
            }
            className={"capitalize"}
          >
            {subscription.status}
          </Badge>
        </div>
        <CardDescription>Your current subscription plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Start Date</p>
              <p className="text-muted-foreground">
                {formatDate(subscription.start_date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">End Date</p>
              <p className="text-muted-foreground">
                {formatDate(subscription.end_date)}
              </p>
              <p className="text-xs text-red-500">
                {daysRemaining > 0
                  ? `Ending in ${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`
                  : "Expired"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Features Included:</p>
          <ul className="space-y-1">
            {subscription.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {feature.key}
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="space-y-2 pt-4">
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Billing
          </Button>
          <Button variant="outline" className="w-full">
            Upgrade Plan
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
