import { Schedule } from "@app/types/schedule.ts";

export interface SavingGoal {
  // 한 해 저축 목표
  goal_amount: MonthSavingGoal;
  // 개인적인 목표
  personal_goal: PersonalGoal;
}

export interface MonthSavingGoal {
  // DB에 저장된 row의 key
  key_id: string | null;
  // 현재 로그인된 사용자 id
  user_id: string;
  // 한 해 저축 목표 금액
  years_goal_amount: string;
  // 한 달의 저축 목표 금액 (front에서 한해 (year)만 받아도 back에서 계산합니다)
  months_goal_amount: string;
}

export interface PersonalGoal {
  // 현재 로그인된 사용자 id
  user_id: string;
  // 목표의 이름
  goal_name: string;
  // 설정된 목표 금액
  goal_amount: string;
  // 기간
  period: string;
  // 요구되는 금액
  month_amount: string;
}

export interface setSavingGoalQuery {
  user_id: string;
  years_goal_amount: string;
}

export interface SetPersonalGoalQuery {
  user_id?: string;
  personal_goal: string;
  goal_amount: string;
  period: string;
  month_amount: string;
}

export interface PersonalGoalForm {
  personal_goal: string;
  goal_amount: number;
  period: string;
}

export interface SpendingGoal {
  offSpendAmount?: SpendAmount;
  OnSpendAmount?: SpendAmount;
}

export interface SpendAmount {
  user_id: string;
  date: string;
  start_date: string;
  end_date: string;
  spend_goal_amount: string;
  spend_amount: string;
}

export interface setSpendingGoal {
  user_id?: string;
  start_date: string;
  end_date: string;
  regular: "ON" | "OFF"; // ON이면 정기로 설정, 시작날짜와 종료날짜가 다름, OFF이면 시작날짜와 종료날짜가 같음
  spend_goal_amount: string;
  is_batch: boolean; // 정기로 일괄 적용할지 말지 true(일괄적용 O), false(일괄적용 X)
}

export interface AssetsByCategory {
  // 현재달
  date: string;
  category_list: AssetByCategory[];
  // 설정된 모든 카테고리의 합산 값입니다.
  category_total: string;
  // 현재달에 설정된 지출 목표액
  spend_goal_amount: string;
  // 지출목표액에 대해서 카테고리 지출 목표액이 얼마만큼 차지하는지 (보라색 바의 퍼센트입니다)
  // Ex) (105000 / 200000) * 100
  ratio: string;
}

export interface AssetByCategory {
  //중분류된 이름
  category_name: string;
  // 중분류의 값
  category_total: string;
  // 중분류 내부의 소분류들
  list: Category[];
}

export interface Category {
  // 소분류의 이름
  name: string;
  // 소분류의 값
  value: string;
}

export interface setAssetByCategory {
  user_id?: string;
  date: string;
  medium_name: string;
  medium_value: string;
  small_map: {
    [key: string]: string;
  };
}

export interface RegularAssetsRequest {
  user_id: string;
  start_date: string;
  end_date: string;
}

export interface RegularAssets {
  data: Schedule[];
}
