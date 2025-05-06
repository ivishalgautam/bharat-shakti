import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import plans from "@/services/plan";

export const useGetPlans = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["plans", searchParams],
    queryFn: () => plans.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetPlan = (id) => {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: () => plans.getById(id),
    enabled: !!id,
  });
};

export const useCreatePlan = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: plans.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Plan created successfully.",
      });
      queryClient.invalidateQueries(["plans"]);
      typeof handleSuccess === "function" && handleSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};

export const useUpdatePlan = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => plans.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Plan updated successfully.",
      });

      queryClient.invalidateQueries(["plans"]);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};

export const useDeletePlan = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => plans.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Plan deleted successfully.",
      });

      queryClient.invalidateQueries(["plans"]);
      typeof handleSuccess === "function" && handleSuccess();
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};
