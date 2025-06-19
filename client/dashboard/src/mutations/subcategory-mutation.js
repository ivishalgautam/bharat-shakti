import { toast } from "@/hooks/use-toast";
import subcategory from "@/services/subcategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSubCategories = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["subcategories", searchParams],
    queryFn: () => subcategory.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetSubCategoriesByCategory = (categoryIds = "") => {
  return useQuery({
    queryKey: ["subcategories", categoryIds],
    queryFn: () => subcategory.getByCategory(categoryIds),
    enabled: !!categoryIds,
  });
};

export const useGetSubcategory = (id) => {
  return useQuery({
    queryKey: ["subcategories", id],
    queryFn: () => subcategory.getById(id),
    enabled: !!id,
  });
};

export const useCreateSubcategory = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subcategory.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Sub Category created successfully.",
      });
      queryClient.invalidateQueries(["subcategories"]);
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

export const useUpdateSubcategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => subcategory.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Sub Category updated successfully.",
      });

      queryClient.invalidateQueries(["subcategories"]);
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

export const useDeleteSubcategory = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => subcategory.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Sub Category deleted successfully.",
      });

      queryClient.invalidateQueries(["subcategories"]);
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
