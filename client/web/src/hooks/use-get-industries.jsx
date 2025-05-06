import industries from "@/services/industry";
import { useQuery } from "@tanstack/react-query";

export default function useGetIndustries() {
  return useQuery({
    queryFn: industries.get,
    queryKey: ["industries"],
  });
}
