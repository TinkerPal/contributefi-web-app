import { getCommunities } from "@/services/communities";
import { useQuery } from "@tanstack/react-query";

export const useGetCommunities = (
  LIMIT,
  OFFSET = 1,
  sortOrder = "DESC",
  communityOwnerId = "",
  searchValue = "",
) => {
  const {
    data: communitiesData,
    isLoading: loadingCommunities,
    isError: errorLoadingCommunities,
    refetch,
  } = useQuery({
    queryKey: [
      "communities",
      LIMIT,
      OFFSET,
      sortOrder,
      communityOwnerId,
      searchValue,
    ],
    queryFn: () =>
      getCommunities({
        limit: LIMIT,
        offset: OFFSET,
        sort: sortOrder,
        communityOwnerId,
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
