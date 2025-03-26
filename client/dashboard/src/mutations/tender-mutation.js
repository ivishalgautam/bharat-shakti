import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import tender from "@/services/tender";

export const useGetTenders = (searchParams = "") => {
  return useQuery({
    queryKey: ["tenders"],
    queryFn: () => tender.get(searchParams),
  });
};

export const useGetTender = (id) => {
  return useQuery({
    queryKey: ["tenders", id],
    queryFn: () => tender.getById(id),
    enabled: !!id,
  });
};

export const useCreateTender = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tender.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Tender created successfully.",
      });
      queryClient.invalidateQueries(["tenders"]);
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

export const useUpdateTender = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => tender.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Tender updated successfully.",
      });

      queryClient.invalidateQueries(["tenders"]);
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

export const useDeleteTender = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => tender.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Tender deleted successfully.",
      });

      queryClient.invalidateQueries(["tenders"]);
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
