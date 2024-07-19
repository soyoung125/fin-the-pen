import { PATH } from "@constants/path.ts";
import { RouterDOM } from "@app/types/common.ts";
import SavingsGoal from "@pages/AssetManagement/pages/SavingGoal";
import RegularAsset from "@pages/AssetManagement/pages/RegularAsset";
import RegularAssetDetail from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail";
import AssetByCategory from "@pages/AssetManagement/pages/AssetBuCategory";
import SpendingGoal from "@pages/AssetManagement/pages/SpendingGoal";

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
    path: `${PATH.DetailInformation}/:template_id`,
    element: <RegularAssetDetail />,
  },
  {
    path: PATH.assetsByCategory,
    element: <AssetByCategory />,
  },
  {
    path: PATH.spendingGoal,
    element: <SpendingGoal />,
  },
];

export default MANAGEMENT_ROUTES;
