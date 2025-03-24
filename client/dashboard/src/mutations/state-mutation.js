import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import state from "@/services/state";
import { toast } from "@/hooks/use-toast";

export const useGetStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: state.get,
  });
};

export const useGetState = (id) => {
  return useQuery({
    queryKey: ["states", id],
    queryFn: () => state.get(id),
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

export const useUpdateState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => state.update(id, data),
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

export const useDeleteState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => state.delete(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "State deleted successfully.",
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
