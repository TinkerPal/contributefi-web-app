import { useNavigate } from "react-router";
import { Button } from "./ui/button";

function ExploreButtons({ tag }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${tag === "footer" ? "flex flex-col justify-center gap-4 sm:flex-row sm:justify-start" : "flex flex-col items-center justify-center gap-4 sm:flex-row"}`}
    >
      <Button
        className="w-full sm:w-fit"
        onClick={() => {
          navigate("/communities");
        }}
        variant="secondary"
        size="lg"
      >
        Explore Communities
      </Button>
      <Button
        onClick={() => {
          navigate("/quests");
        }}
        variant="outline"
        size="lg"
        className={`${tag === "footer" && "bg-white"} w-full sm:w-fit`}
      >
        View Quests
      </Button>
    </div>
  );
}

export default ExploreButtons;
