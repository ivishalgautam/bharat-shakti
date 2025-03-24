import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import city from "@/services/city";
import { toast } from "@/hooks/use-toast";

export const useGetCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: city.get,
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

export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => city.update(id, data),
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

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => city.delete(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "City deleted successfully.",
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
