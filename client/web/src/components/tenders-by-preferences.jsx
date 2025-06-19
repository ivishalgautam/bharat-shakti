"use client";
import TenderCardPremium from "@/components/cards/tender-card-premium";
import TendersFiltersLayout from "@/components/layout/tenders-filters-layout";
import Spinner from "@/components/spinner";
import ErrorMessage from "@/components/ui/error";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth-provider";
import tender from "@/services/tender";
import wishlists from "@/services/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function TendersByPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => tender.getBySimilarTenders(searchParamsStr),
    queryKey: ["tenders-by-preferences", user, searchParamsStr],
    enabled: !!user,
  });

  const followMutation = useMutation({
    mutationFn: (data) => wishlists.create(data),
    onSuccess: () => {
      toast({
        title: "Success.",
        description: "Followed.",
      });
      queryClient.invalidateQueries(["tenders-by-preferences"]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong!",
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
      queryClient.invalidateQueries(["is-tender-followed", data.id]);
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

  return (
    <div className="mt-6 space-y-4">
      <TendersFiltersLayout>
        <Suspense fallback={"Loading..."}>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <ErrorMessage error={error} />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
              {data?.tenders?.map((tender) => (
                <TenderCardPremium
                  key={tender.id}
                  tender={tender}
                  followMutation={followMutation}
                  unfollowMutation={unfollowMutation}
                  user={user}
                />
              ))}
            </div>
          )}
        </Suspense>
      </TendersFiltersLayout>
    </div>
  );
}
