import { PATH } from "@constants/path.ts";
import { RouterDOM } from "@app/types/common.ts";
import { lazy } from "react";

const SavingsGoal = lazy(
  () => import("@pages/AssetManagement/pages/SavingGoal")
);
const RegularAsset = lazy(
  () => import("@pages/AssetManagement/pages/RegularAsset")
);
const RegularAssetDetail = lazy(
  () =>
    import(
      "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/RegularAssetDetail.tsx"
    )
);
const AssetByCategory = lazy(
  () => import("@pages/AssetManagement/pages/AssetBuCategory")
);
const SpendingGoal = lazy(
  () => import("@pages/AssetManagement/pages/SpendingGoal")
);

const MANAGEMENT_ROUTES: RouterDOM[] = [
  {
    path: PATH.savingsGoal,
    element: <SavingsGoal />,
  },
  {
    path: PATH.regularDepositWithdrawal,
    element: <RegularAsset />,
  },
  {
    path: `${PATH.DetailInformation}/:eventName/:priceType`,
    element: <RegularAssetDetail />,
  },
  {
    path: PATH.assetsByCategory,
    element: <AssetByCategory />,
  },
  {
    path: PATH.scheduleManagement,
    element: <SpendingGoal />,
  },
];

export default MANAGEMENT_ROUTES;
