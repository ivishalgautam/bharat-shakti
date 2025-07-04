import category from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  return useQuery({
    queryFn: category.get,
    queryKey: ["categories"],
  });
}
