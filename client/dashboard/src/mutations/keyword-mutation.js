import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keyword from "@/services/keyword";
import { toast } from "@/hooks/use-toast";

export const useGetKeywords = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["keywords", searchParams],
    queryFn: () => keyword.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetKeyword = (id) => {
  return useQuery({
    queryKey: ["keywords", id],
    queryFn: () => keyword.getById(id),
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

export const useUpdateKeyword = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => keyword.update(id, data),
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

export const useDeleteKeyword = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => keyword.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Keyword deleted successfully.",
      });

      queryClient.invalidateQueries(["keywords"]);
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
