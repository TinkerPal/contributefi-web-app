import { useNavigate } from "react-router";
import CommunitiesCard from "./CommunitiesCard";
import { Button } from "./ui/button";
import Loader from "./Loader";
import Error from "./Error";
import Empty from "./Empty";
import { useGetCommunities } from "@/hooks/useGetCommunities";

function FeaturedCommunities() {
  const navigate = useNavigate();

  const LIMIT = 6;

  const { communities, loadingCommunities, errorLoadingCommunities } =
    useGetCommunities(LIMIT);

  return (
    <div className="bg-[#F7F9FD]">
      <div className="mx-auto w-full max-w-300 space-y-8 px-5 py-10">
        <div className="space-y-4 text-center">
          <h2 className="text-[32px] font-extrabold text-[#0D0516] lg:text-[44px]">
            Featured Communities
          </h2>

          <p className="mx-auto max-w-200 text-[18px] font-light text-[#636366] lg:text-[20px]">
            Join thousands of contributors making impact across decentralized
            communities.
          </p>
        </div>

        {loadingCommunities ? (
          <Loader />
        ) : errorLoadingCommunities ? (
          <Error title="Failed to load communities..." />
        ) : communities.length === 0 ? (
          <Empty title="No communities found..." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, i) => (
              <CommunitiesCard community={community} key={i} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-1.5">
          <Button
            onClick={() => {
              navigate("/communities");
            }}
            size="lg"
            variant="secondary"
          >
            Explore all Communities
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCommunities;
