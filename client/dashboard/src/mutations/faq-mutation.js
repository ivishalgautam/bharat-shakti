import { toast } from "@/hooks/use-toast";
import faq from "@/services/faq";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFAQs = (searchParams = "page=1") => {
  return useQuery({
    queryKey: ["faqs", searchParams],
    queryFn: () => faq.get(searchParams),
    enabled: !!searchParams,
  });
};

export const useGetFAQ = (id) => {
  return useQuery({
    queryKey: ["faqs", id],
    queryFn: () => faq.getById(id),
    enabled: !!id,
  });
};

export const useCreateFAQ = (handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: faq.create,
    onSuccess: () => {
      toast({
        title: "Created",
        description: "FAQs created successfully.",
      });
      queryClient.invalidateQueries(["faqs"]);
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

export const useUpdateFAQ = (id, searchParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => faq.update(id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "FAQ updated successfully.",
      });

      queryClient.invalidateQueries(["faqs", searchParams]);
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

export const useDeleteFAQ = (id, handleSuccess) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => faq.deleteById(id),
    onSuccess: () => {
      toast({
        title: "Deleted",
        description: "FAQ deleted successfully.",
      });

      queryClient.invalidateQueries(["faqs"]);
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
