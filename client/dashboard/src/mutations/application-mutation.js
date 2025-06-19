import { toast } from "@/hooks/use-toast";
import application from "@/services/application";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetApplications = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["applications", searchParams],
    queryFn: () => application.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetApplication = (id) => {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => application.getById(id),
    enabled: !!id,
  });
};

export const useUpdateApplication = (id, searchParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => application.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Application updated successfully.",
      });

      queryClient.invalidateQueries(["applications", searchParams]);
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

export const useDeleteApplication = (id, handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => application.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Application deleted successfully.",
      });

      queryClient.invalidateQueries(["applications"]);
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
