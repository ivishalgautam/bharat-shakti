import cities from "@/services/cities";
import { useQuery } from "@tanstack/react-query";

export const useGetCities = () => {
  return useQuery({
    queryFn: cities.get,
    queryKey: ["cities"],
  });
};

export const useGetCitiesByStateIds = (ids) => {
  return useQuery({
    queryFn: () => cities.getByStateIds(ids),
    queryKey: ["cities", ids],
    enabled: !!ids,
  });
};
