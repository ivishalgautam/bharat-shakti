const { default: keywords } = require("@/services/keyword");
const { useQuery } = require("@tanstack/react-query");

export const useGetKeywords = () => {
  return useQuery({
    queryFn: keywords.get,
    queryKey: ["keywords"],
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetFeaturedKeywords = () => {
  return useQuery({
    queryFn: keywords.getFeatured,
    queryKey: ["featured-keywords"],
    staleTime: 1000 * 60 * 2,
  });
};
