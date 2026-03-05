import { Button } from "./ui/button";

function CreateWorkAndEarn() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex w-full max-w-300 flex-col justify-between gap-12 px-5 lg:flex-row">
        <div className="flex flex-col gap-6 lg:order-2 lg:max-w-xl">
          <div className="lg-text-[24px] w-fit rounded-[58px] bg-[#E2F1FE] px-8 py-2 text-[20px] font-light text-[#1082E4] lg:px-8 lg:py-3">
            Create, Work & Earn
          </div>

          <div className="space-y-8">
            <h2 className="text-[30px] font-extrabold text-[#0D0516] lg:text-[40px]">
              Build, Contribute and Get Rewarded
            </h2>

            <p className="text-[18px] font-light text-[#48484A] lg:text-[20px]">
              Discover communities, take on meaningful quests, and track your
              growth with AI-powered insights and Git-based contribution
              tracking and earn while at it. Contribute.fi helps your
              collaborate with other brilliant minds without friction.
            </p>
          </div>

          <Button
            className="w-fit"
            onClick={() => {
              window.open(
                "https://app.contribute.fi",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            variant="secondary"
            size="lg"
          >
            Launch App
          </Button>
        </div>

        <img
          className="mx-auto h-auto w-full bg-radial from-blue-100 from-40% to-white sm:w-1/2 lg:order-1 lg:w-full"
          src="/Blue Harmony and Balance 1.svg"
          alt=""
          height="314"
          width="372"
        />
      </div>
    </div>
  );
}

export default CreateWorkAndEarn;
