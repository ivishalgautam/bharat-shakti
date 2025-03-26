import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authority from "@/services/authority";
import { toast } from "@/hooks/use-toast";

export const useGetAuthorities = (searchParams = "") => {
  return useQuery({
    queryKey: ["authorities"],
    queryFn: () => authority.get(searchParams),
  });
};

export const useGetAuthority = (id) => {
  return useQuery({
    queryKey: ["authorities", id],
    queryFn: () => authority.getById(id),
    enabled: !!id,
  });
};

export const useCreateAuthority = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authority.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "Authority created successfully.",
      });
      queryClient.invalidateQueries(["authorities"]);
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

export const useUpdateAuthority = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => authority.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "Authority updated successfully.",
      });

      queryClient.invalidateQueries(["authorities"]);
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

export const useDeleteAuthority = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => authority.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "Authority deleted successfully.",
      });

      queryClient.invalidateQueries(["authorities"]);
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
