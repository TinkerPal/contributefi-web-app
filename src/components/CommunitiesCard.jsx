import { COMMUNITY_TAG_BG } from "@/lib/constants";

function CommunitiesCard({ community }) {
  const handleOpen = () => {
    window.open(
      `https://app.contribute.fi/communities/${encodeURIComponent(community.communityAlias)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleJoinCommunity = (e) => {
    e.stopPropagation();
    window.open(
      `https://app.contribute.fi/login`,
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
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {community?.logoUrl ? (
              <img src={community?.logoUrl} alt="" />
            ) : (
              <img src="/ChartPolar.svg" alt="" />
            )}

            <div className="space-y-1">
              <p className="font-semibold text-[#050215]">
                {community?.communityName}
              </p>

              <p className="flex gap-1 text-[14px] text-[#2F0FD1]">
                <img src="/UsersThree (1).svg" alt="" />{" "}
                <span className="shrink-0">
                  {community?.members > 1
                    ? `${community?.members} members`
                    : `${community?.members} member`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {/* {community?.tag.map((t, i) => (
              <div
                className={`rounded-[4px] px-[12px] py-[5px] text-sm font-normal text-[#313131] ${COMMUNITY_TAG_BG[t]}`}
                key={i}
              >
                {t}
              </div>
            ))} */}
          </div>
        </div>

        <p className="text-sm font-light text-[#050215]">
          {community?.communityDescription}
        </p>
      </div>

      <div className="flex items-end justify-between rounded-lg border-[0.5px] border-[#F0F4FD] bg-[#F7F9FD] p-4">
        <div className="space-y-2 text-sm font-normal text-[#525866]">
          <div className="flex gap-1.5">
            <img src="/Briefcase.svg" alt="" />
            <span> {community?.newTasks} new tasks</span>
          </div>
          <div className="flex gap-1.5">
            <img src="/Coins.svg" alt="" />
            <span>{community?.totalSpent ?? 0} tokens spent</span>
          </div>
        </div>

        <button
          onClick={handleJoinCommunity}
          className={`cursor-pointer font-medium text-[#2F0FD1] disabled:cursor-not-allowed`}
        >
          + Join
        </button>
      </div>
    </div>
  );
}

export default CommunitiesCard;
