import CommunitiesCard from "@/components/CommunitiesCard";
import Filter from "@/components/Filter";
import CustomPagination from "@/components/CustomPagination";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import CustomSearch from "@/components/Search";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import Empty from "@/components/Empty";
import { useGetCommunities } from "@/hooks/useGetCommunities";

function CommunitiesPage() {
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

  const {
    communities,
    communitiesData,
    loadingCommunities,
    errorLoadingCommunities,
    totalPages,
  } = useGetCommunities(LIMIT, OFFSET, debouncedSearch);

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
              All Communities ({communitiesData?.totalElements})
            </h2>
            <p className="font-light md:text-[20px]">
              Explore communities building impactful projects
            </p>
          </div>

          <div className="flex shrink-0 lg:order-3">
            <Filter
              tag="landing"
              filters={
                [
                  // {
                  //   value: "Active",
                  //   label: "Active",
                  // },
                  // {
                  //   value: "Expired",
                  //   label: "Expired",
                  // },
                ]
              }
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </div>

          <CustomSearch
            placeholder="Search community"
            value={searchValue}
            onSearchChange={handleSearch}
          />
        </div>

        {loadingCommunities ? (
          <Loader />
        ) : errorLoadingCommunities ? (
          <Error title="Failed to load communities..." />
        ) : communities.length === 0 ? (
          <Empty title="No communities found..." />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {communities.map((community, i) => (
                <CommunitiesCard community={community} key={i} />
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

export default CommunitiesPage;
