"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import wishlists from "@/services/wishlist";
import { toast } from "@/hooks/use-toast";
import ErrorMessage from "@/components/ui/error";
import { Skeleton } from "@/components/ui/skeleton";
import TendersPagination from "@/components/tenders/tenders-pagination";
import TenderCardPremium from "@/components/cards/tender-card-premium";
import viewTenders from "@/services/view-tender";
import application from "@/services/application";

export default function TendersListing({ type }) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const searchParamsStr = searchParams.toString();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () =>
      type === "favourite"
        ? wishlists.get(searchParamsStr)
        : type === "viewed"
          ? viewTenders.get(searchParamsStr)
          : type === "applied"
            ? application.get(searchParamsStr)
            : [],
    queryKey:
      type === "favourite"
        ? ["favourite-tenders", searchParamsStr]
        : ["viewed-tenders", searchParamsStr],
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
    <div className="!mt-[68px] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
            {data?.data?.map((tender) => (
              <TenderCardPremium
                tender={tender}
                key={tender.id}
                followMutation={followMutation}
                unfollowMutation={unfollowMutation}
              />
            ))}
          </div>

          {/* Pagination */}
          <TendersPagination totalItems={data?.total} />
        </div>
      )}
    </div>
  );
}

function getRemainingDays(dateString) {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
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
