import { TASK_TAG_BG } from "@/lib/constants";
import { toast } from "react-toastify";

function QuestCard({ task }) {
  const handleOpen = () => {
    if (!task.isActive) {
      toast.error("Quest is no longer available");
      return;
    }
    window.open(
      `https://app.contribute.fi/tasks/${encodeURIComponent(task.id)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      onClick={handleOpen}
      className={`flex cursor-pointer flex-col justify-center gap-8 rounded-xl border-2 border-[#F0F4FD] bg-white px-6 py-7`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div
            className={`w-fit rounded-lg px-3 py-1.25 text-sm font-normal text-[#313131] ${TASK_TAG_BG[task.category]}`}
          >
            {task.category === "ON_CHAIN"
              ? "On Chain"
              : task.category === "GROWTH"
                ? "Growth"
                : "Technical"}
          </div>

          <div
            className={`w-fit rounded-lg px-3 py-1.25 text-sm font-normal text-[#313131] ${TASK_TAG_BG[task.rewardType]}`}
          >
            {task.rewardType}
          </div>
          <div
            className={`w-fit rounded-lg px-3 py-1.25 text-sm font-normal text-[#313131] ${task.isActive ? "bg-green-400" : "bg-red-400"} text-white`}
          >
            {task.isActive ? "Active" : "Expired"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* <p className="flex shrink-0 gap-1.5 font-semibold text-[#2F0FD1]">
            <img src="/Gift.svg" alt="" />
            {task.rewardType === "Token"
              ? `${task.tokensPerWinner} XLM per winner`
              : `${task.pointsPerWinner} Points per winner`}
          </p> */}
          <div className="flex shrink-0 items-center gap-1">
            {/* <div className="h-1 w-1 rounded-full bg-[#636366]" /> */}
            <p className="flex gap-1.5 text-base font-semibold text-[#8791A7]">
              <img src="/UsersThree.svg" alt="" />
              <span className="font-light">
                {task.rewardType === "Token"
                  ? `${task.numberOfWinners} winner${task.numberOfWinners > 1 ? "s" : ""}`
                  : "All participants win"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={`space-y-2`}>
        <p className="max-w-full truncate overflow-hidden text-base font-semibold whitespace-nowrap text-[#1C1C1E]">
          {task.title || task.questTitle}
        </p>
        <p className="max-w-full truncate overflow-hidden text-base font-normal whitespace-nowrap text-[#636366]">
          by {task.communityName}
        </p>
      </div>
    </div>
  );
}

export default QuestCard;
