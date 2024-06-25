import { SCHEDULE_DRAWER_MODE, VIEW_MODE } from "@constants/schedule.ts";
import { UpdateStateInterface } from "./common.ts";

interface ScheduleBase {
  schedule_id?: string;
  id?: string;
  user_id?: string;
  event_name: string;
  category: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  period: SchedulePeriod;
  price_type: string;
  payment_type: string;
  fix_amount: boolean;
}

export interface Schedule extends ScheduleBase {
  all_day: boolean;
  repeat_kind: "NONE" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  repeat_options: { term: string; options: string | YearCategory };
  amount: string;
  exclude: boolean;
}

export interface RequestSchedule extends ScheduleBase {
  is_all_day: boolean;
  repeat_kind?: "NONE" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  repeat: ScheduleRepeat;
  set_amount: string;
  exclusion: boolean;
}

export interface ScheduleRepeat {
  day_type: {
    repeat_term: string;
  };
  week_type: {
    repeat_day_of_week: string;
    repeat_term: string;
  };
  month_type: {
    today_repeat: boolean;
    select_date: string;
    repeat_term: string;
  };
  year_type: {
    year_repeat: string;
    repeat_term: string;
    year_category: YearCategory; //"MonthAndDay" | "NthDayOfMonth" | "LastDayOfMonth"
  };
  kind_type: repeatKindType;
}

export type repeatKindType = "day" | "week" | "month" | "year" | "none";

export type YearCategory = "MonthAndDay" | "NthDayOfMonth" | "LastDayOfMonth";

export interface SchedulePeriod {
  is_repeat_again: boolean;
  repeat_number_time: string;
  repeat_end_line: string;
  kind_type?: string;
}

export type ViewModeValue = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

export type ScheduleDrawerModeValue =
  ScheduleDrawerMode[keyof ScheduleDrawerMode];

export type ScheduleDrawerMode = typeof SCHEDULE_DRAWER_MODE;

export interface GetScheduleQuery {
  user_id: string;
  date: string;
}

export interface MonthScheduleQuery {
  user_id: string;
  date: string;
}

export interface HomeQuery {
  user_id: string;
  main_month: string;
  calendar_date: string;
}

export interface RepeatTypeProps {
  repeatType: string;
  repeat: ScheduleRepeat;
}

export interface PeriodTypeProps {
  periodType: string;
  period: SchedulePeriod;
}

export interface RepeatOptionProps {
  handleChangeOption: (state: UpdateStateInterface) => void;
}

export interface RepeatProps extends RepeatTypeProps, RepeatOptionProps {}

export interface PeriodProps extends PeriodTypeProps, RepeatOptionProps {}

export interface ScheduleResponse {
  count: number;
  data: Schedule[];
  deposit: number;
  withdraw: number;
}

export interface MonthSchedule {
  available: string;
  count: number;
  data: Schedule[];
  expense: string;
  income: string;
}

export interface WeekSchedule {
  income: string;
  available: string;
  expense: string;
  week_schedule: WeeklySchedule[];
}

export interface WeeklySchedule {
  // 몇번째 주차인지
  week_of_number: string; //"1주차" | "2주차" | "3주차" | "4주차" | "5주차" | "6주차"
  // 해당 주차의 기간
  period: string;
  // 해당 주의 수입
  plus: number;
  // 해당 주의 지출
  minus: number;
}

export interface DaySchedule {
  // 하루동안의 전체 수입
  income: string;
  // 지출 예정
  expect?: string;
  // 지출 금액
  dayExpense: string;
  // 현재 일자에 등록된 전체 일정의 개수
  schedule_count: number;
  // 사용가능 금액 = 지출 목표액 - 지출 - 지출예정
  available?: string | number;
}
