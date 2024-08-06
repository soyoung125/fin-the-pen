import moment from "moment";
import {
  RequestSchedule,
  Schedule,
  SchedulePeriod,
  ScheduleRepeat,
  YearCategory,
} from "@app/types/schedule.ts";

export const INIT_REPEAT = (date: moment.Moment): ScheduleRepeat => {
  return {
    day_type: {
      repeat_term: "1",
    },
    week_type: {
      repeat_day_of_week: date.locale("en").format("dddd").toUpperCase(),
      repeat_term: "1",
    },
    month_type: {
      today_repeat: true,
      select_date: date.format("DD"),
      repeat_term: "1",
    },
    year_type: {
      year_repeat: date.format("MM-DD"),
      repeat_term: "1",
      year_category: "MonthAndDay",
    },
    kind_type: "none",
  };
};

export const SCHEDULE_REQUEST = (schedule: Schedule) => {
  const { term, options } = schedule.repeat_options;
  const start = moment(schedule.start_date);
  let repeat = INIT_REPEAT(start);

  switch (schedule.repeat_kind) {
    case "DAY":
      repeat = {
        ...repeat,
        kind_type: "day",
        day_type: { repeat_term: term },
      };
      break;
    case "WEEK":
      repeat = {
        ...repeat,
        kind_type: "week",
        week_type: { repeat_term: term, repeat_day_of_week: options },
      };
      break;
    case "MONTH":
      repeat = {
        ...repeat,
        kind_type: "month",
        month_type: {
          repeat_term: term,
          today_repeat: !options,
          select_date: options ?? "",
        },
      };
      break;
    case "YEAR":
      repeat = {
        ...repeat,
        kind_type: "year",
        year_type: {
          repeat_term: term,
          year_repeat: YEAR_REPEAT(schedule.start_date, options as YearCategory)
            .value,
          year_category: options as YearCategory,
        },
      };
      break;
  }
  return {
    ...schedule,
    is_all_day: schedule.all_day,
    set_amount: schedule.amount,
    exclusion: schedule.exclude,
    repeat: repeat,
    repeat_kind: schedule.repeat_kind,
    register_template: false,
  };
};

export const YEAR_REPEAT = (startDate: string, type: YearCategory) => {
  const week = ["첫", "두", "세", "네", "다섯", "여섯"];
  const start = moment(startDate);
  const month = start.month() + 1;
  const firstWeek = moment(startDate).startOf("month").week();
  const thisWeek = month === 12 && start.week() === 1 ? 53 : start.week();
  const weekIdx = thisWeek - firstWeek;

  switch (type) {
    case "MonthAndDay":
      return { label: start.format("MM월 DD일"), value: start.format("MM-DD") };
    case "NthDayOfMonth":
      return {
        label: start.format(`MM월 ${week[weekIdx]}번째 dddd`),
        value: start.format(`MM월 ${weekIdx + 1}번째 dddd`),
      };
    case "LastDayOfMonth":
      return {
        label: start.format("MM월 마지막 dddd"),
        value: start.format("MM월 마지막 dddd"),
      };
  }
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
  template: "기록된 반복 일정",
  showAllTemplate: "전체보기",
  name: "제목",
  date: "날짜",
  start: "시작",
  end: "종료",
  repeat: "반복",
  period: "기간",
  all_day: "하루종일",
  category_title: "카테고리",
  add_category: "+ 카테고리 추가",
  set_finance_title: "자산 설정하기",
  set_spending_title: "금액 설정",
  type_plus: "+", // 저장 데이터와 연동되어 있음 (수정금지)
  type_minus: "-", // 저장 데이터와 연동되어 있음 (수정금지)
  won: "원",
  expected_spending: "예상 비용",
  fix_amount: "금액 고정",
  set_payment_type_title: "입출금 수단",
  account: "ACCOUNT", // 저장 데이터와 연동되어 있음 (수정금지)
  card: "CARD", // 저장 데이터와 연동되어 있음 (수정금지)
  cash: "CASH", // 저장 데이터와 연동되어 있음 (수정금지)
  exclusion_title: "예산에서 제외",
  add_schedule: "일정 추가하기",
  modify_schedule: "일정 수정하기",
  delete_schedule: "일정 삭제하기",
} as const;

export const PAYMENT_TYPE = [
  {
    id: "account",
    value: "ACCOUNT",
    label: "계좌",
  },
  {
    id: "card",
    value: "CARD",
    label: "카드",
  },
  {
    id: "cash",
    value: "CASH",
    label: "현금",
  },
];

export const SCHEDULE_DRAWER_MODE = {
  modify: "modify",
  create: "create",
} as const;

export const INIT_SCHEDULE = (date: string): RequestSchedule => {
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
    is_all_day: false,
    repeat: INIT_REPEAT(moment(date)),
    period: INIT_PERIOD(moment(date)),
    price_type: SCHEDULE_DRAWER.type_minus,
    set_amount: "0",
    fix_amount: false,
    payment_type: SCHEDULE_DRAWER.card,
    exclusion: false, // false면 포함
    register_template: false,
  };
};

export const TUTORIAL_SCHEDULE = () => {
  return {
    ...INIT_SCHEDULE(moment().format("YYYY-MM-DD")),
    event_name: "아름다운 클리닉",
    category: "뷰티/미용",
  };
};

export const VIEW_MODE = {
  asset: "asset",
  schedule: "schedule",
} as const;

export const REGULAR_DEPOSIT_WITHDRAWAL_TYPE = {
  "+": "입금",
  "-": "출금",
} as const;
