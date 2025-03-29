import keywords from "@/services/keyword";
import { useQuery } from "@tanstack/react-query";

export default function useGetKeywords() {
  return useQuery({
    queryFn: keywords.get,
    queryKey: ["keywords"],
  });
}
