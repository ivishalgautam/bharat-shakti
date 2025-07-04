import subcategory from "@/services/subcategory";
import { useQuery } from "@tanstack/react-query";

export const useGetSubcategories = () => {
  return useQuery({
    queryFn: subcategory.get,
    queryKey: ["subcategories"],
  });
};

export const useGetSubcategoriesByCategory = (categoryIds) => {
  return useQuery({
    queryFn: () => subcategory.getByCategoryIds(categoryIds),
    queryKey: ["subcategories", categoryIds],
    enabled: !!categoryIds,
  });
};
