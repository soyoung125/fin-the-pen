import { lightBlue, pink, teal, yellow } from "@mui/material/colors";
import { PATH } from "./path.ts";

export interface AssetManagement {
  title: string;
  color: string;
  path: string;
}

const assetManagements: ReadonlyArray<AssetManagement> = [
  {
    title: "저축 목표 금액 설정",
    color: pink[200],
    path: PATH.savingsGoal,
  },
  {
    title: "지출 목표 금액 설정 ",
    color: teal[200],
    path: PATH.spendingGoal,
  },
  {
    title: "카테고리별 지출액 설정",
    color: lightBlue[200],
    path: PATH.assetsByCategory,
  },
  {
    title: "정기 템플릿 관리",
    color: yellow[200],
    path: PATH.regularDepositWithdrawal,
  },
];

export default assetManagements;
