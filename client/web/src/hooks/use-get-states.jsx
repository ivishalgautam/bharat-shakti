import states from "@/services/state";
import { useQuery } from "@tanstack/react-query";

export default function useGetStates() {
  return useQuery({
    queryFn: states.get,
    queryKey: ["states"],
  });
}
