import { useNavigate } from "react-router";
import QuestCard from "./QuestCard";
import { Button } from "./ui/button";
import Loader from "./Loader";
import Error from "./Error";
import Empty from "./Empty";
import { useGetQuest } from "@/hooks/useGetQuest";

function ExploreQuest() {
  const navigate = useNavigate();

  const LIMIT = 6;

  const { quests, loadingQuests, errorLoadingQuests } = useGetQuest(LIMIT);

  return (
    <div className="bg-[#F7F9FD]">
      <div className="mx-auto w-full max-w-300 space-y-8 px-5 py-10">
        <div className="space-y-4 text-center">
          <h2 className="text-[32px] font-extrabold text-[#0D0516] lg:text-[44px]">
            Explore Available Quest
          </h2>

          <p className="mx-auto max-w-200 text-[18px] font-light text-[#636366] lg:text-[20px]">
            Discover the most active opportunities from communities making real
            impact
          </p>
        </div>

        {loadingQuests ? (
          <Loader />
        ) : errorLoadingQuests ? (
          <Error title="Failed to load quests..." />
        ) : quests.length === 0 ? (
          <Empty title="No quest found..." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quests.map((quest, i) => (
              <QuestCard task={quest} key={i} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-1.5">
          <Button
            onClick={() => {
              navigate("/quests");
            }}
            size="lg"
            variant="secondary"
          >
            See all Quests
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExploreQuest;
