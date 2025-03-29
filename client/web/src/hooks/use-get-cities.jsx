import cities from "@/services/cities";
import { useQuery } from "@tanstack/react-query";

export default function useGetCities() {
  return useQuery({
    queryFn: cities.get,
    queryKey: ["cities"],
  });
}
