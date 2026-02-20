import { Outlet } from "react-router";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="fixed right-0 left-0 z-50 px-5 pt-2">
        <Header />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default RootLayout;
