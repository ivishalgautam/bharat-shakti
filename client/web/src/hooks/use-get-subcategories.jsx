import subcategory from "@/services/subcategory";
import { useQuery } from "@tanstack/react-query";

export default function useGetSubcategories() {
  return useQuery({
    queryFn: subcategory.get,
    queryKey: ["subcategories"],
  });
}
