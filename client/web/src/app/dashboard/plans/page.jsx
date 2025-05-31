"use client";
import SubscriptionCard from "@/components/cards/subscription-card";
import Spinner from "@/components/spinner";
import ErrorMessage from "@/components/ui/error";
import subscriptions from "@/services/subscription";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PlansPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => subscriptions.get(""),
    queryKey: ["subscriptions"],
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {data.map((subscription) => (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      ))}
    </div>
  );
}
