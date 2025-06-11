"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TendersPagination from "./tenders-pagination";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import tender from "@/services/tender";
import ErrorMessage from "../ui/error";
import { Skeleton } from "../ui/skeleton";
import wishlists from "@/services/wishlist";
import { toast } from "@/hooks/use-toast";
import TenderCardPremium from "../cards/tender-card-premium";
import React, { useContext } from "react";
import { AuthContext } from "@/providers/auth-provider";

export default function AllTendersListing() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const searchParamsStr = searchParams.toString();
  const { user, isUserLoading } = useContext(AuthContext);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => tender.get(searchParamsStr, user),
    queryKey: ["tenders", searchParamsStr, user],
  });

  const followMutation = useMutation({
    mutationFn: (data) => wishlists.create(data),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Followed.",
      });
      queryClient.invalidateQueries(["tenders", searchParamsStr]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: ({ id }) => wishlists.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Unfollowed.",
      });
      queryClient.invalidateQueries(["tenders", searchParamsStr]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
      });
    },
  });

  if (isError) return <ErrorMessage error={error} />;

  return isLoading ? (
    <div className="!mt-[68px] grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {Array.from({ length: 10 }).map((_, key) => (
        <LoaderCard key={key} />
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tenders ({data.total})</h2>
      </div>

      {data.total === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-center text-muted-foreground">
              No tenders found matching your filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
            {data?.tenders.map((tender, ind) => (
              <React.Fragment key={tender.id}>
                <TenderCardPremium
                  tender={tender}
                  key={tender.id}
                  followMutation={followMutation}
                  unfollowMutation={unfollowMutation}
                  user={user}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Pagination */}
          <TendersPagination totalItems={data?.total} />
        </div>
      )}
    </div>
  );
}

function LoaderCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Skeleton className="h-6 w-48 bg-primary/20" />
            <Skeleton className="mt-1 h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
}
