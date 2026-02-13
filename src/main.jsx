import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/RootLayout";
import TaskPage from "./pages/TaskPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import ReactQueryProviders from "./components/ReactQueryProviders";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "learn-more",
        element: (
          <div className="flex h-screen items-center justify-center font-extrabold">
            In Development...
          </div>
        ),
      },
      {
        path: "terms-of-use",
        element: (
          <div className="flex h-screen items-center justify-center font-extrabold">
            In Development...
          </div>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <div className="flex h-screen items-center justify-center font-extrabold">
            In Development...
          </div>
        ),
      },
      { path: "quests", Component: TaskPage },
      { path: "communities", Component: CommunitiesPage },
      { path: "*", Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactQueryProviders>
      <RouterProvider router={router} />
      <ToastContainer />
    </ReactQueryProviders>
  </StrictMode>,
);
