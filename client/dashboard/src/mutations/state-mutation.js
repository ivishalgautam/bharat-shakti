import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import state from "@/services/state";
import { toast } from "@/hooks/use-toast";

export const useGetStates = (searchParams = "") => {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => state.get(searchParams),
  });
};

export const useGetState = (id) => {
  return useQuery({
    queryKey: ["states", id],
    queryFn: () => state.getById(id),
    enabled: !!id,
  });
};

export const useCreateState = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: state.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "State created successfully.",
      });
      queryClient.invalidateQueries(["states"]);
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

export const useUpdateState = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => state.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "State updated successfully.",
      });

      queryClient.invalidateQueries(["states"]);
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

export const useDeleteState = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => state.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "State deleted successfully.",
      });

      queryClient.invalidateQueries(["states"]);
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
