"use client";
import Spinner from "@/components/spinner";
import ErrorMessage from "@/components/ui/error";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import orderFollowup from "@/services/order-followup";
import ViewOrderFollowup from "../../_component/view-order-follow-up";

export default function ViewOrderFollowupPage({ params: { slug } }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-followups", slug],
    queryFn: () => orderFollowup.getByApplicationId(slug),
    enabled: !!slug,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return <ViewOrderFollowup data={data} />;
}
