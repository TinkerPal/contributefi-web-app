import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function RootLayout() {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  return (
    <div className={`${sheetIsOpen && "blur-sm duration-1000"}`}>
      <ScrollToTop />
      <div className="fixed right-0 left-0 z-50 bg-white/90 px-5 pt-8 pb-6">
        <Header sheetIsOpen={sheetIsOpen} setSheetIsOpen={setSheetIsOpen} />
      </div>

      <main className="space-y-16 pt-40 lg:space-y-26">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
