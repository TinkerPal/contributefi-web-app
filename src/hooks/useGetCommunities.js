import { getCommunities } from "@/services/communities";
import { useQuery } from "@tanstack/react-query";

export const useGetCommunities = (LIMIT, OFFSET = 1, searchValue = "") => {
  const {
    data: communitiesData,
    isLoading: loadingCommunities,
    isError: errorLoadingCommunities,
    refetch,
  } = useQuery({
    queryKey: ["communities", LIMIT, OFFSET, searchValue],
    queryFn: () =>
      getCommunities({
        limit: LIMIT,
        offset: OFFSET,
        searchValue,
      }),
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
    refetch,
  };
};
