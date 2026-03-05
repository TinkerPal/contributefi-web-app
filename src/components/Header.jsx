import { LANDING_NAV_LINKS } from "@/lib/constants";
import { NavLink, useLocation } from "react-router";
import MobileNavigation from "./MobileNavigation";
import { Button } from "./ui/button";
import Logo from "./Logo";

function Header({ sheetIsOpen, setSheetIsOpen }) {
  const location = useLocation();

  return (
    <header className="mx-auto flex w-full max-w-300 items-center justify-between rounded-[360px] bg-[#F0F4FD] px-6 py-4 lg:px-20 lg:py-6">
      <Logo />

      {/* DESKTOP NAV */}
      <nav className="hidden text-base font-normal text-[#1C1C1E] lg:block">
        <ul className="flex gap-5 lg:gap-10">
          {LANDING_NAV_LINKS.map((link) => (
            <li key={link.title}>
              {link.title === "Testimonials" ? (
                <NavLink
                  className={`hover:text-[#2F0FD1] hover:underline ${location.hash === link.href.slice(1) && "font-extrabold text-[#2F0FD1]"}`}
                  to={link.href}
                >
                  {link.title}
                </NavLink>
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-extrabold text-[#2F0FD1] hover:underline"
                      : "hover:text-[#2F0FD1] hover:underline"
                  }
                  to={link.href}
                >
                  {link.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <Button
        className="hidden  lg:flex"
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

      {/* MOBILE NAV */}
      <MobileNavigation
        side="right"
        sheetIsOpen={sheetIsOpen}
        setSheetIsOpen={setSheetIsOpen}
        tag="home-page"
      >
        <div className="flex min-h-1/2 flex-col items-center justify-center gap-14 px-4 pt-10 text-base text-[#0D0516]">
          <nav>
            <ul className="flex flex-col items-center gap-6">
              {LANDING_NAV_LINKS.map((link) => (
                <li key={link.title}>
                  {link.title === "Testimonials" ? (
                    <NavLink
                      className={`hover:text-[#2F0FD1] hover:underline ${location.hash === link.href.slice(1) && "font-extrabold text-[#2F0FD1]"}`}
                      to={link.href}
                      onClick={() => setSheetIsOpen(false)}
                    >
                      {link.title}
                    </NavLink>
                  ) : (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "font-extrabold text-[#2F0FD1] hover:underline"
                          : "hover:text-[#2F0FD1] hover:underline"
                      }
                      to={link.href}
                      onClick={() => setSheetIsOpen(false)}
                    >
                      {link.title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Button
            className="w-full"
            onClick={() => {
              window.open(
                "https://app.contribute.fi",
                "_blank",
                "noopener,noreferrer",
              );
              setSheetIsOpen(false);
            }}
            variant="secondary"
            size="lg"
          >
            Launch App
          </Button>
        </div>
      </MobileNavigation>
    </header>
  );
}

export default Header;
