import BackButton from "@/components/BackButton";
import CustomPagination from "@/components/CustomPagination";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Filter from "@/components/Filter";
import Loader from "@/components/Loader";
import CustomSearch from "@/components/Search";
import TasksCard from "@/components/TasksCard";
import { useGetQuest } from "@/hooks/useGetQuest";
import React, { useState } from "react";

function TaskPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const LIMIT = 10;
  const OFFSET = (currentPage - 1) * LIMIT;

  const { questsData, quests, loadingQuests, errorLoadingQuests } = useGetQuest(
    LIMIT,
    OFFSET,
    searchValue,
  );

  const totalPages = questsData?.totalPages ?? 1;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="bg-white pt-40">
      <div className="mx-auto w-full max-w-[1200px] space-y-8 px-5 pb-10 lg:px-10">
        <BackButton />

        {loadingQuests ? (
          <Loader />
        ) : errorLoadingQuests ? (
          <Error title="Failed to load quests..." />
        ) : quests.length === 0 ? (
          <Empty title="No quests found..." />
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4 lg:items-end">
              <div className="text-[#050215]">
                <h2 className="text-[24px] font-extrabold md:text-[44px]">
                  Available Tasks ({questsData.totalElements})
                </h2>
                <p className="font-light md:text-[20px]">
                  Explore list of available tasks
                </p>
              </div>

              <div className="flex shrink-0 lg:order-3">
                <Filter tag="landing" />
              </div>

              <CustomSearch
                placeholder="Search task"
                onSearchChange={handleSearch}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quests.map((quest, i) => (
                <TasksCard task={quest} key={i} tag="task-page" />
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

export default TaskPage;
