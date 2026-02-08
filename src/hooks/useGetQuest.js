import { getQuests } from "@/services/quests";
import { useQuery } from "@tanstack/react-query";

export const useGetQuest = (LIMIT, OFFSET = 1, searchValue = "") => {
  const {
    data: questsData,
    isLoading: loadingQuests,
    isError: errorLoadingQuests,
  } = useQuery({
    queryKey: ["quests", LIMIT, OFFSET, searchValue],
    queryFn: () => getQuests({ limit: LIMIT, offset: OFFSET, searchValue }),
    keepPreviousData: true,
  });

  const quests = questsData?.data ?? [];

  return {
    questsData,
    quests,
    loadingQuests,
    errorLoadingQuests,
  };
};
