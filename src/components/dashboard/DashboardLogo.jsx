import { Link } from "react-router";

function DashboardLogo() {
  return (
    <Link
      onClick={() => {
        window.scrollTo({
          top: 0,
        });
      }}
      className="text-[32px] font-extrabold text-[#2F0FD1]"
      to="/"
    >
      CF
    </Link>
  );
}

export default DashboardLogo;
