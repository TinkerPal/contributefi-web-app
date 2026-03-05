function About() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex w-full max-w-300 flex-col justify-between gap-12 px-5 lg:flex-row">
        <div className="flex flex-col gap-6 lg:max-w-xl">
          <div className="lg-text-[24px] w-fit rounded-[58px] bg-[#E2F1FE] px-8 py-2 text-[20px] font-light text-[#1082E4] lg:px-8 lg:py-3">
            About Contribute
          </div>

          <div className="space-y-8">
            <h2 className="text-[30px] font-extrabold text-[#0D0516] lg:text-[40px]">
              A thriving ecosystem of builders and innovators
            </h2>

            <p className="text-[18px] font-light text-[#48484A] lg:text-[20px]">
              Contribute.fi is a decentralized contributor coordination and
              community management platform built on Soroban and integrated into
              the Stellar ecosystem. Contribute.fi connects projects with
              contributors through smart-contract-enforced tasks, wallet-linked
              reputation, community hubs, AI-powered analytics, and Git-based
              development tracking.
            </p>
          </div>
        </div>

        <img
          className="mx-auto h-auto w-full sm:w-1/2 lg:w-full"
          src="/Frame (1).svg"
          alt=""
          height="314"
          width="372"
        />
      </div>
    </div>
  );
}

export default About;
