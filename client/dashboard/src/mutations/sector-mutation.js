import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import sector from "@/services/sector";
import { toast } from "@/hooks/use-toast";

export const useGetSectors = () => {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: sector.get,
  });
};

export const useGetSector = (id) => {
  return useQuery({
    queryKey: ["sectors", id],
    queryFn: () => sector.get(id),
    enabled: !!id,
  });
};

export const useCreateSector = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sector.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Sector created successfully.",
      });
      queryClient.invalidateQueries(["sectors"]);
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

export const useUpdateSector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => sector.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Sector updated successfully.",
      });

      queryClient.invalidateQueries(["sectors"]);
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

export const useDeleteSector = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => sector.delete(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Sector deleted successfully.",
      });

      queryClient.invalidateQueries(["sectors"]);
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
