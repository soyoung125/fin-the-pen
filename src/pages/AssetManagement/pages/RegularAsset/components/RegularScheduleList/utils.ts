import { Schedule, YearCategory } from "@app/types/schedule.ts";
import { YEAR_REPEAT } from "@constants/schedule.ts";

const weekName: { [key: string]: string } = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

export const getTitle = (schedule: Schedule) => {
  switch (schedule.repeat_kind) {
    case "YEAR": {
      const yearOption = YEAR_REPEAT(
        schedule.start_date,
        schedule.repeat_options.options as YearCategory
      );
      return `매년 ${yearOption.label}`;
    }
    case "MONTH": {
      return `매달 ${schedule.repeat_options.options}`;
    }
    case "WEEK": {
      const weekOption = schedule.repeat_options.options.split(",").map((w) => {
        return weekName[w];
      });
      return `매주 ${weekOption.join(", ")}`;
    }
    case "DAY":
      return "매일";
    default:
      return "";
  }
};
