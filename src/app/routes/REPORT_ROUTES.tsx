import { RouterDOM } from "@app/types/common.ts";
import { PATH } from "@constants/path.ts";
// import Report from "@pages/reports/Report";
// import ReportMonthDetails from "@pages/reports/ReportMonthDetails";
// import ReportCategoryDetails from "@pages/reports/ReportCategoryDetails/ReportCategoryDetails.tsx";
import { lazy } from "react";

const Report = lazy(() => import("@pages/reports/Report"));
const ReportMonthDetails = lazy(
  () => import("@pages/reports/ReportMonthDetails")
);
const ReportCategoryDetails = lazy(
  () => import("@pages/reports/ReportCategoryDetails/ReportCategoryDetails.tsx")
);

const REPORT_ROUTES: RouterDOM[] = [
  {
    path: PATH.report,
    element: <Report />,
  },
  {
    path: PATH.reportMonthDetail,
    element: <ReportMonthDetails />,
  },
  {
    path: `${PATH.reportCategoryDetail}/:category`,
    element: <ReportCategoryDetails />,
  },
];

export default REPORT_ROUTES;
