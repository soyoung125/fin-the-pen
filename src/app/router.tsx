import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../components/layouts/containerLayout/HomeLayout";
// import ManagementLayout from "../components/layouts/containerLayout/ManagementLayout";
// import ReportLayout from "@components/layouts/containerLayout/ReportLayout.tsx";
import HOME_ROUTES from "./routes/HOME_ROUTES";
import MANAGEMENT_ROUTES from "./routes/MANAGEMENT_ROUTES";
import REPORT_ROUTES from "@routes/REPORT_ROUTES.tsx";
import { lazy } from "react";

const HomeLayout = lazy(
  () => import("../components/layouts/containerLayout/HomeLayout")
);
const ManagementLayout = lazy(
  () => import("../components/layouts/containerLayout/ManagementLayout")
);
const ReportLayout = lazy(
  () => import("../components/layouts/containerLayout/ReportLayout")
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          children: HOME_ROUTES,
        },
        {
          path: "/management",
          element: <ManagementLayout />,
          children: MANAGEMENT_ROUTES,
        },
        {
          path: "/report",
          element: <ReportLayout />,
          children: REPORT_ROUTES,
        },
      ],
    },
  ],
  {
    basename: "/fin-the-pen-web",
  }
);

export default router;
