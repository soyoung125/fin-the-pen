import moment from "moment";
import {
  Schedule,
  SchedulePeriod,
  ScheduleRepeat,
} from "@app/types/schedule.ts";

export const INIT_REPEAT = (date: moment.Moment): ScheduleRepeat => {
  return {
    day_type: {
      repeat_value: "1",
    },
    week_type: {
      repeat_day_of_week: date.locale("en").format("dddd").toUpperCase(),
      repeat_value: "1",
    },
    month_type: {
      today_repeat: true,
      select_date: date.format("D"),
      repeat_value: "1",
    },
    year_type: {
      year_repeat: date.format("M월 D일"),
      repeat_value: "1",
      year_category: "MonthAndDay",
    },
    kind_type: "none",
  };
};

export const INIT_PERIOD = (date: moment.Moment): SchedulePeriod => {
  return {
    is_repeat_again: true,
    repeat_number_time: "1",
    repeat_end_line: date.add(1, "w").format("YYYY-MM-DD"),
    kind_type: "is_repeat_again",
  };
};

export const SCHEDULE_DRAWER = {
  drawer_title: {
    create: "새로운 이벤트",
    read: "일정",
    modify: "일정 편집",
  },
  name: "제목",
  date: "날짜",
  start: "시작",
  end: "종료",
  repeat: "반복",
  period: "기간",
  all_day: "하루종일",
  category_title: "일정 카테고리",
  add_category: "+ 카테고리 추가",
  set_finance_title: "자산 설정하기",
  set_spending_title: "금액 설정",
  type_plus: "+", // 저장 데이터와 연동되어 있음 (수정금지)
  type_minus: "-", // 저장 데이터와 연동되어 있음 (수정금지)
  won: "원",
  expected_spending: "예상 비용",
  fix_amount: "금액 고정",
  set_importance_title: "일정 중요도",
  importance_high: "상", // 저장 데이터와 연동되어 있음 (수정금지)
  importance_middle: "중", // 저장 데이터와 연동되어 있음 (수정금지)
  importance_low: "하", // 저장 데이터와 연동되어 있음 (수정금지)
  exclusion_title: "예산에서 제외",
  add_schedule: "일정 추가하기",
  modify_schedule: "일정 수정하기",
  delete_schedule: "일정 삭제하기",
} as const;

export const IMPORTANCES = [
  {
    id: "importance_low",
    value: "하",
    label: "낮음",
  },
  {
    id: "importance_middle",
    value: "중",
    label: "중간",
  },
  {
    id: "importance_high",
    value: "상",
    label: "높음",
  },
];

export const SCHEDULE_DRAWER_MODE = {
  modify: "modify",
  create: "create",
} as const;

export const NEED_TITLE = "제목을 입력해야 합니다.";
export const NEED_CATEGORY = "카테고리를 선택해야 합니다.";
export const WRONG_TIME_ORDER =
  "종료 시각이 시작 시각보다 빠르지 않았으면 좋겠어요.";

export const INIT_SCHEDULE = (date: string): Schedule => {
  const startDate = moment(date);
  const endDate = moment(date);
  if (moment().isSame(date, "day")) {
    startDate.add(1, "hours");
    endDate.add(3, "hours");
  } else {
    startDate.set("hour", 9);
    endDate.set("hour", 11);
  }

  return {
    event_name: "",
    start_date: date,
    end_date: endDate.format("YYYY-MM-DD"),
    start_time: startDate.format("HH:00"),
    end_time: endDate.format("HH:00"),
    category: "",
    all_day: false,
    repeat: INIT_REPEAT(moment(date)),
    period: INIT_PERIOD(moment(date)),
    price_type: SCHEDULE_DRAWER.type_minus,
    amount: "0",
    fix_amount: false,
    importance: SCHEDULE_DRAWER.importance_middle,
    exclude: false, // false면 포함
  };
};

export const REPEAT_CYCLE = {
  일간: "days",
  주간: "weeks",
  월간: "months",
  연간: "years",
} as const;

export const VIEW_MODE = {
  asset: "asset",
  schedule: "schedule",
} as const;

export const REGULAR_DEPOSIT_WITHDRAWAL_TYPE = {
  "+": "입금",
  "-": "출금",
} as const;