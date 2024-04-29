import { PATH } from "@constants/path.ts";
import Home from "@pages/Home";
import { RouterDOM } from "@app/types/common.ts";
import { lazy } from "react";

const SignIn = lazy(() => import("../../pages/SignIn"));
const SignUp = lazy(() => import("../../pages/SignUp"));
const ScheduleListPage = lazy(
  () => import("@pages/Home/pages/ScheduleListPage/ScheduleListPage.tsx")
);
const MyPage = lazy(() => import("@pages/MyPage"));
const Notification = lazy(() => import("../../pages/Notification"));
const AssetManagement = lazy(() => import("../../pages/AssetManagement"));
const SearchSchedule = lazy(
  () => import("../../pages/Home/components/HomeContainer/view/SearchSchedule")
);
const Settings = lazy(() => import("@pages/Settings"));
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
    path: PATH.searchSchedule,
    element: <SearchSchedule />,
  },
  {
    path: PATH.settings,
    element: <Settings />,
  },
  {
    path: PATH.test,
    element: <TestContainer />,
  },
];

export default HOME_ROUTES;
