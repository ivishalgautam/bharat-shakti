import { toast } from "@/hooks/use-toast";
import category from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategories = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["categories", searchParams],
    queryFn: () => category.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => category.getById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: category.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Category created successfully.",
      });
      queryClient.invalidateQueries(["categories"]);
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

export const useUpdateCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => category.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Category updated successfully.",
      });

      queryClient.invalidateQueries(["categories"]);
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

export const useDeleteCategory = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => category.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Category deleted successfully.",
      });

      queryClient.invalidateQueries(["categories"]);
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
