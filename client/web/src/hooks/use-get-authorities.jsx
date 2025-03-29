import authorities from "@/services/authorities";
import { useQuery } from "@tanstack/react-query";

export default function useGetAuthorities() {
  return useQuery({
    queryFn: authorities.get,
    queryKey: ["authorities"],
  });
}
