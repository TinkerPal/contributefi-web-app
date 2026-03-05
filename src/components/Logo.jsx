import { Link, useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();

  return (
    <Link
      href="/"
      onClick={(e) => {
        e.preventDefault();

        navigate("/");
        window.scrollTo({
          top: 0,
        });
      }}
      className="text-[32px] font-extrabold text-[#2F0FD1] lg:text-[40px]"
    >
      CF
    </Link>
  );
}

export default Logo;
