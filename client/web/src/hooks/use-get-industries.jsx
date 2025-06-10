import industries from "@/services/industries";
import { useQuery } from "@tanstack/react-query";

export default function useGetIndustries(searchParams) {
  return useQuery({
    queryFn: () => industries.get(searchParams),
    queryKey: ["industries"],
  });
}
