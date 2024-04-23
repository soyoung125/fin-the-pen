import DetailSetting from "../../legacies/assetManagement/RegularDepositWithDrawalContainer/detailPage/DetailSetting";
import { PATH } from "@constants/path.ts";
import { RouterDOM } from "@app/types/common.ts";
import SpendingGoal from "@pages/AssetManagement/pages/SpendingGoal";
import AssetByCategory from "@pages/AssetManagement/pages/AssetBuCategory";
import SavingsGoal from "@pages/AssetManagement/pages/SavingGoal";
import RegularAsset from "@pages/AssetManagement/pages/RegularAsset";
import RegularAssetDetail from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/RegularAssetDetail.tsx";

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
    path: PATH.DetailSetting,
    element: <DetailSetting />,
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
