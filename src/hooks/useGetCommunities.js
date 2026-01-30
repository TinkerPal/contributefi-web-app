import { getCommunities } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetCommunities = (LIMIT, OFFSET = 1) => {
  const {
    data: communitiesData,
    isLoading: loadingCommunities,
    isError: errorLoadingCommunities,
  } = useQuery({
    queryKey: ["communities", LIMIT, OFFSET],
    queryFn: () => getCommunities({ limit: LIMIT, offset: OFFSET }),
    keepPreviousData: true,
  });

  const communities = communitiesData?.data ?? [];
  const totalPages = communitiesData?.totalPages ?? 1;

  return {
    communities,
    communitiesData,
    loadingCommunities,
    errorLoadingCommunities,
    totalPages,
  };
};
