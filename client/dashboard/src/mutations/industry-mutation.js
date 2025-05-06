import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import industries from "@/services/industry";

export const useGetIndustries = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["industries", searchParams],
    queryFn: () => industries.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetIndustry = (id) => {
  return useQuery({
    queryKey: ["industries", id],
    queryFn: () => industries.getById(id),
    enabled: !!id,
  });
};

export const useCreateIndustry = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: industries.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Industry created successfully.",
      });
      queryClient.invalidateQueries(["industries"]);
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

export const useUpdateIndustry = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => industries.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Industry updated successfully.",
      });

      queryClient.invalidateQueries(["industries"]);
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

export const useDeleteIndustry = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => industries.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Industry deleted successfully.",
      });

      queryClient.invalidateQueries(["industries"]);
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
