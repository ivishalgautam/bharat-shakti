import reports from "@/services/report";
import { useQuery } from "@tanstack/react-query";

export const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: reports.get,
  });
};
