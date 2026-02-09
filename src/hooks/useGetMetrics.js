import { getMetrics } from "@/services/metrics";
import { useQuery } from "@tanstack/react-query";

export const useGetMetrics = () => {
  const {
    data,
    isLoading: loadingMetrics,
    isError: errorLoadingMetrics,
  } = useQuery({
    queryKey: ["metrics"],
    queryFn: () => getMetrics(),
    keepPreviousData: true,
  });

  return {
    data,
    loadingMetrics,
    errorLoadingMetrics,
  };
};
