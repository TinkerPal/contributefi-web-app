import BackButton from "@/components/BackButton";
import CustomPagination from "@/components/CustomPagination";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Filter from "@/components/Filter";
import Loader from "@/components/Loader";
import CustomSearch from "@/components/Search";
import QuestCard from "@/components/QuestCard";
import { useGetQuest } from "@/hooks/useGetQuest";
import React, { useEffect, useState } from "react";

function QuestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const LIMIT = 10;
  const OFFSET = currentPage;

  const { questsData, quests, loadingQuests, errorLoadingQuests } = useGetQuest(
    LIMIT,
    OFFSET,
    debouncedSearch,
  );

  const totalPages = questsData?.totalPages ?? 1;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-300 space-y-8 px-5 pb-10 pt-4">
        <BackButton />

        <div className="flex flex-wrap items-end justify-between gap-4 lg:items-end">
          <div className="text-[#050215]">
            <h2 className="text-[24px] font-extrabold md:text-[44px]">
              Total Quests ({questsData?.totalElements})
            </h2>
            <p className="font-light md:text-[20px]">
              Explore list of available Quest
            </p>
          </div>

          <div className="flex shrink-0 lg:order-3">
            <Filter
              tag="landing"
              filters={[
                {
                  value: "Active",
                  label: "Active",
                },
                {
                  value: "Expired",
                  label: "Expired",
                },
              ]}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </div>

          <CustomSearch
            placeholder="Search task"
            value={searchValue}
            onSearchChange={handleSearch}
          />
        </div>

        {loadingQuests ? (
          <Loader />
        ) : errorLoadingQuests ? (
          <Error title="Failed to load quests..." />
        ) : quests.length === 0 ? (
          <Empty title="No quests found..." />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quests.map((quest, i) => (
                <QuestCard task={quest} key={i} />
              ))}
            </div>

            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default QuestPage;
