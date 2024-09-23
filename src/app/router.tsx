import { createBrowserRouter } from "react-router-dom";
import HOME_ROUTES from "./routes/HOME_ROUTES";
import MANAGEMENT_ROUTES from "./routes/MANAGEMENT_ROUTES";
import REPORT_ROUTES from "@routes/REPORT_ROUTES.tsx";
import HomeLayout from "@components/layouts/containerLayout/HomeLayout.tsx";
import ManagementLayout from "@components/layouts/containerLayout/ManagementLayout.tsx";
import ReportLayout from "@components/layouts/containerLayout/ReportLayout.tsx";

const router = createBrowserRouter([
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
]);

export default router;
