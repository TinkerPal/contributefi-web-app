import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router";

function MobileNavigation({
  side = "right" | "left",
  sheetIsOpen,
  setSheetIsOpen,
  children,
  tag,
}) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handler = () => {
      if (mediaQuery.matches) {
        setSheetIsOpen(false);
      }
    };

    handler();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [setSheetIsOpen]);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <button className="cursor-pointer rounded-[4px] bg-[#2F0FD1] p-0.5 opacity-100 ring-offset-background transition-opacity hover:opacity-70 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary lg:hidden">
          <Menu className="size-8 text-white" />
          <span className="sr-only">Open mobile navigation</span>
        </button>
      </SheetTrigger>
      <SheetContent side={side} className="bg-white">
        <SheetHeader className="relative">
          <SheetTitle className="absolute top-5 left-4 text-[32px] font-extrabold text-[#2F0FD1]">
            {tag === "home-page" ? (
              <Link
                onClick={() => {
                  setSheetIsOpen(false);
                  window.scrollTo({
                    top: 0,
                  });
                }}
                to="/"
              >
                CF
              </Link>
            ) : (
              <Link
                onClick={() => {
                  setSheetIsOpen(false);
                  window.scrollTo({
                    top: 0,
                  });
                }}
                to="/"
              >
                CF
              </Link>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavigation;
