import { toast } from "@/hooks/use-toast";
import city from "@/services/city";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCities = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["cities", searchParams],
    queryFn: () => city.get(searchParams),
    enabled: !!searchParams,
  });
};
export const useGetCitiesByState = (stateId) => {
  return useQuery({
    queryKey: ["cities", stateId],
    queryFn: () => city.getByState(stateId),
    enabled: !!stateId,
  });
};

export const useGetCity = (id) => {
  return useQuery({
    queryKey: ["cities", id],
    queryFn: () => city.getById(id),
    enabled: !!id,
  });
};

export const useCreateCity = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: city.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "City created successfully.",
      });
      queryClient.invalidateQueries(["cities"]);
      typeof handleSuccess === "function" && handleSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};

export const useUpdateCity = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => city.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "City updated successfully.",
      });

      queryClient.invalidateQueries(["cities"]);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};

export const useDeleteCity = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => city.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "City deleted successfully.",
      });

      queryClient.invalidateQueries(["cities"]);
      typeof handleSuccess === "function" && handleSuccess();
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });
};
