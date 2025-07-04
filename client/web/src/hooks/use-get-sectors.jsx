import sectors from "@/services/sectors";
import { useQuery } from "@tanstack/react-query";

export default function useGetSectors() {
  return useQuery({
    queryFn: sectors.get,
    queryKey: ["sectors"],
  });
}
