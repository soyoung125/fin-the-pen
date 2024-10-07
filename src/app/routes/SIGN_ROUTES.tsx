import { PATH } from "@constants/path.ts";
import { RouterDOM } from "@app/types/common.ts";
import { lazy } from "react";
import Start from "@pages/Start/Start.tsx";

const SignIn = lazy(() => import("@pages/SignIn"));
const SignUp = lazy(() => import("@pages/SignUp"));

const SIGN_ROUTES: RouterDOM[] = [
  {
    path: PATH.start,
    element: <Start />,
  },
  {
    path: PATH.signInRoot,
    element: <SignIn />,
  },
  {
    path: PATH.signUp,
    element: <SignUp />,
  },
];

export default SIGN_ROUTES;
