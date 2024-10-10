import { Schedule } from "@app/types/schedule.ts";

export interface Report {
  current_date: string;
  // 월별 소비 리포트
  monthly_report: {
    current_amount: number; // 이달 소비
    second_amount: number; // 두달 전 소비
    previous_amount: number; // 지난 달 소비
  };
  first_month_amount: number | "0"; // 현재달의 1일부터 current_date 까지 소비한 값
  spend_amount: number | "0"; // 지출 목표
  available_amount: number; // 사용 가능 금액
  category_consume_list: CategoryReport[] | "?"; // 카테고리 소비
  expenditure_data: {
    last_Nmonth_Amount: number | "0";
    first_Nmonth_Amount: number | "0"; // 1일 ~ 현재 소비
    spend_amount: number | "0"; // 지출 목표
    available_Nmonth_amount: number | "0"; // 이용 가능 금액
  };
  Nmonth_fixed: {
    diff_plus: string; // 수입 차이
    current_fixed_plus: number; // 고정 입금
    current_fixed_Minus: number; // 고정 출금
    diff_minus: string; // 출금 차이
    current_month: string; // 이달
    previous_month: string; // 전달
  };
}

export interface CategoryReport {
  amount: number;
  rate: string;
  category: string;
}

export interface GoalResponse {
  user_id: string;
  date: string;
  expenditure_amount: string;
}

export interface CategoryDetailResponse {
  list: Schedule[];
  balanceValue: string;
  category_goal_amount: string;
  currentValue: string;
  expectValue: string;
  name: string;
}

export interface CategoryDetailQuery {
  user_id: string;
  date: string;
  category: string;
}

export interface CategoryDetail {
  month_schedule: { [key: string]: Schedule[] };
  category: string;
  category_goal: string;
  category_expense: string;
  category_expect: string;
  category_balance: string;
  count: number;
}
