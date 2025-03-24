import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keyword from "@/services/keyword";
import { toast } from "@/hooks/use-toast";

export const useGetKeywords = () => {
  return useQuery({
    queryKey: ["keywords"],
    queryFn: keyword.get,
  });
};

export const useGetKeyword = (id) => {
  return useQuery({
    queryKey: ["keywords", id],
    queryFn: () => keyword.get(id),
    enabled: !!id,
  });
};

export const useCreateKeyword = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: keyword.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Keyword created successfully.",
      });
      queryClient.invalidateQueries(["keywords"]);
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

export const useUpdateKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => keyword.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Keyword updated successfully.",
      });

      queryClient.invalidateQueries(["keywords"]);
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

export const useDeleteKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => keyword.delete(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Keyword deleted successfully.",
      });

      queryClient.invalidateQueries(["keywords"]);
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
