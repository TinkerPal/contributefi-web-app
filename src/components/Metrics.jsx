import { useGetMetrics } from "@/hooks/useGetMetrics";
import Loader from "./Loader";
import Error from "./Error";
import Empty from "./Empty";

function Metrics() {
  const { data, loadingMetrics, errorLoadingMetrics } = useGetMetrics();

  return (
    <div className="space-y-8 bg-white px-5 lg:space-y-16">
      <div className="mx-auto max-w-300 space-y-4 text-center">
        <h2 className="text-[32px] font-extrabold text-[#1C1C1E] lg:text-[44px]">
          A Growing Network of Builders
        </h2>

        <p className="mx-auto max-w-200 text-[18px] font-light text-[#636366] lg:text-[20px]">
          Join communities, complete tasks, and earn rewards alongside thousands
          of contributors.
        </p>
      </div>

      {loadingMetrics ? (
        <Loader />
      ) : errorLoadingMetrics ? (
        <Error title="Failed to load metrics data..." />
      ) : data.length === 0 ? (
        <Empty title="No metrics data found..." />
      ) : (
        <div className="mx-auto grid w-full max-w-300 grid-cols-2 gap-1 md:grid-cols-4 lg:px-10 [@media(max-width:379px)]:grid-cols-1">
          {data.map((metric, i) => (
            <div
              key={i}
              className={`flex flex-col justify-center rounded-xl bg-[#F7F9FD] px-5 py-10 [@media(max-width:379px)]:items-center ${metric.title === "paid out" && "sm:order-4 [@media(max-width:379px)]:order-4"}`}
            >
              <div
                className={`${metric.title === "communities" || metric.title === "contributors" ? "text-[#2F0FD1]" : "text-[#1082E4]"} text-[32px] font-bold lg:text-[48px]`}
              >
                {metric.title === "paid out" && "$"}
                {metric.count} {metric.title !== "contributors" && ""}
              </div>
              <div className="text-[15px] font-medium text-[#636366] lg:text-[20px]">
                {metric.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Metrics;
