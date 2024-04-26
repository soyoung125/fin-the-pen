// import AssetManagement from "../../pages/AssetManagement";
// import MyPage from "../../pages/MyPage";
// import Notification from "../../pages/Notification";
// import Settings from "@pages/Settings";
// import SignIn from "../../pages/SignIn";
// import SignUp from "../../pages/SignUp";
// import TestContainer from "@pages/MyPage/TestContainer.tsx";
import { PATH } from "@constants/path.ts";
import Home from "@pages/Home";
import { RouterDOM } from "@app/types/common.ts";
// import DetailSetting from "../../legacies/assetManagement/SavingsGoalContainer/DetailSetting";
// import FetchPaymentHistory from "../../pages/Home/components/HomeContainer/view/FetchPaymentHistory";
// import SearchSchedule from "../../pages/Home/components/HomeContainer/view/SearchSchedule";
// import MyData from "@pages/Settings/components/connection/MyData";
// import ScheduleListPage from "@pages/Home/pages/ScheduleListPage/ScheduleListPage.tsx";
import { lazy } from "react";

const SignIn = lazy(() => import("../../pages/SignIn"));
const SignUp = lazy(() => import("../../pages/SignUp"));
const ScheduleListPage = lazy(
  () => import("../../pages/Home/components/HomeContainer/view/SearchSchedule")
);
const MyPage = lazy(
  () => import("@pages/Settings/components/connection/MyData")
);
const Notification = lazy(() => import("../../pages/Notification"));
const AssetManagement = lazy(() => import("../../pages/AssetManagement"));
const FetchPaymentHistory = lazy(
  () =>
    import("../../pages/Home/components/HomeContainer/view/FetchPaymentHistory")
);
const SearchSchedule = lazy(
  () => import("../../pages/Home/components/HomeContainer/view/SearchSchedule")
);
const DetailSetting = lazy(
  () =>
    import("../../legacies/assetManagement/SavingsGoalContainer/DetailSetting")
);
const Settings = lazy(() => import("@pages/Settings"));
const MyData = lazy(() => import("../../pages/MyPage"));
const TestContainer = lazy(() => import("@pages/MyPage/TestContainer.tsx"));

const HOME_ROUTES: RouterDOM[] = [
  {
    path: PATH.home,
    element: <Home />,
  },
  {
    path: PATH.scheduleList,
    element: <ScheduleListPage />,
  },
  {
    path: PATH.signIn,
    element: <SignIn />,
  },
  {
    path: PATH.signUp,
    element: <SignUp />,
  },
  {
    path: PATH.myPage,
    element: <MyPage />,
  },
  {
    path: PATH.notification,
    element: <Notification />,
  },
  {
    path: PATH.assetManagement,
    element: <AssetManagement />,
  },
  {
    path: PATH.fetchPaymentHistory,
    element: <FetchPaymentHistory />,
  },
  {
    path: PATH.searchSchedule,
    element: <SearchSchedule />,
  },
  {
    path: PATH.savingDetailSetting,
    element: <DetailSetting />,
  },
  {
    path: PATH.settings,
    element: <Settings />,
  },
  {
    path: PATH.myData,
    element: <MyData />,
  },
  {
    path: PATH.test,
    element: <TestContainer />,
  },
];

export default HOME_ROUTES;
