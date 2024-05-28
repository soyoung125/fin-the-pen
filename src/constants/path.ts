export const PATH = {
  home: "/",
  scheduleList: "schedule-list",
  signIn: "/sign-in",
  signUp: "/sign-up",
  myPage: "/myPage",
  notification: "/notification",
  searchSchedule: "/search=schedule",
  assetManagement: "/asset-management",
  settings: "/Settings",
  test: "/test",

  report: "/report",
  reportMonthDetail: "/report/month",
  reportCategoryDetail: "/report/category",

  // 자산관리의 세부 설정 페이지 (경로명 수정할 계획)
  savingsGoal: "/management/savings-savingGoal",
  regularDepositWithdrawal: "/management/regular-assets",
  DetailSetting: "/management/regular-assets-setting",
  DetailInformation: "/management/regular-assets-detail-info",
  assetsByCategory: "/management/assets-by-category",
  spendingGoal: "/management/spending-goal",
} as const;
