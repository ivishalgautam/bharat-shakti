import { toast } from "@/hooks/use-toast";
import sector from "@/services/sector";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSectors = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["sectors", searchParams],
    queryFn: () => sector.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetSector = (id) => {
  return useQuery({
    queryKey: ["sectors", id],
    queryFn: () => sector.getById(id),
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

export const useUpdateSector = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => sector.update(id, data),
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

export const useDeleteSector = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => sector.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Sector deleted successfully.",
      });

      queryClient.invalidateQueries(["sectors"]);
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
