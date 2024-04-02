export const PATH = {
  home: "/",
  scheduleList: "schedule-list",
  signIn: "/sign-in",
  signUp: "/sign-up",
  myPage: "/myPage",
  notification: "/notification",
  fetchPaymentHistory: "/fetch-payment-history",
  searchSchedule: "/search=schedule",
  assetManagement: "/asset-management",
  settings: "/Settings",
  test: "/test",

  analysis: "/analysis",
  analysisDetail: "/analysis/detail",

  report: "/report",
  reportMonthDetail: "/report/month",
  reportCategoryDetail: "/report/category",

  // 자산관리의 세부 설정 페이지 (경로명 수정할 계획)
  savingsGoal: "/management/savings-savingGoal",
  savingDetailSetting: "/saving-detail-setting",
  regularDepositWithdrawal: "/management/regular-deposit-withdrawal",
  DetailSetting: "/management/regular-deposit-withdrawal-detail-setting",
  DetailInformation: "/management/regular-deposit-withdrawal-detail-info",
  assetsByCategory: "/management/assets-by-category",
  scheduleManagement: "/management/schedule-management",

  // setting pages
  myData: "/Settings/my-data",
} as const;
