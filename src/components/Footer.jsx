import { FOOTER_LINKS } from "@/lib/constants";
import { Link } from "react-router";
import { Fragment } from "react";
import ExploreButtons from "./ExploreButtons";

function Footer() {
  return (
    <div className="bg-[#F0F4FD]">
      <footer className="mx-auto w-full max-w-300 space-y-16 px-5 pt-16 pb-5 md:px-10">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-8">
            <div className="w-full max-w-120.75 space-y-4">
              <p className="text-[40px] font-extrabold text-[#2F0FD1]">CF</p>
              <p className="text-[20px] font-light text-[#09032A]">
                Contribute.fi — Decentralized coordination for communities.
              </p>
            </div>

            <ExploreButtons tag="footer" />
          </div>

          <div className="grid w-fit grid-cols-1 gap-5 text-base lg:flex-1 lg:grid-cols-3">
            {FOOTER_LINKS.map((link, i) => (
              <Fragment key={i}>
                <Link
                  className="font-normal text-[#1C1C1E] hover:text-[#2F0FD1] hover:underline"
                  to={link.href}
                >
                  {link.title}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <p className="text-center font-medium text-[#1C097D]">
          © {new Date().getFullYear()} Contribute.fi. All rights reserved{" "}
        </p>
      </footer>
    </div>
  );
}

export default Footer;
