import AssetsByCategory from "../../legacies/assetManagement/AssetsByCategory";
import RegularDepositWithdrawal from "../../legacies/assetManagement/RegularDepositWithDrawalContainer";
import DetailInformation from "../../legacies/assetManagement/RegularDepositWithDrawalContainer/detailPage/DetailInformation";
import DetailSetting from "../../legacies/assetManagement/RegularDepositWithDrawalContainer/detailPage/DetailSetting";
import SavingsGoal from "../../pages/AssetManagement/pages/SavingGoal/SavingsGoal.tsx";
import { PATH } from "@constants/path.ts";
import { RouterDOM } from "@app/types/common.ts";
import SpendingGoal from "@pages/AssetManagement/pages/SpendingGoal";

const MANAGEMENT_ROUTES: RouterDOM[] = [
  {
    path: PATH.savingsGoal,
    element: <SavingsGoal />,
  },
  {
    path: PATH.regularDepositWithdrawal,
    element: <RegularDepositWithdrawal />,
  },
  {
    path: PATH.DetailSetting,
    element: <DetailSetting />,
  },
  {
    path: PATH.DetailInformation,
    element: <DetailInformation />,
  },
  {
    path: PATH.assetsByCategory,
    element: <AssetsByCategory />,
  },
  {
    path: PATH.scheduleManagement,
    element: <SpendingGoal />,
  },
];

export default MANAGEMENT_ROUTES;
