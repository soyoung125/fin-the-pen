import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_SCHEDULES, QUERY_KEY_WEEK } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import {
  HomeQuery,
  WeeklySchedule,
  WeekSchedule,
} from "@app/types/schedule.ts";
import moment from "moment";

const fetchWeekSchedules = async (query: HomeQuery) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/home/week`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<WeekSchedule>(async (res) => {
    if (!res.ok) {
      return init_data(query.main_month);
    }
    return res.json();
  });
};

export const useWeekSchedules = (query: HomeQuery) => {
  return useQuery({
    queryKey: [QUERY_KEY_SCHEDULES, query.main_month, QUERY_KEY_WEEK],
    queryFn: () => fetchWeekSchedules(query),
  });
};

export const init_data = (date: string) => {
  const selected = moment(`${date}-01`);
  const format = "M/D";
  const lastDay = moment(`${date}-01`).endOf("month").format("YYYY-MM-DD");
  let count = 1;
  let result: WeeklySchedule[] = [];

  while (!selected.isSameOrAfter(lastDay, "date")) {
    const first = selected.day(1).format(format);
    const last = selected.day(7).format(format);
    result = [
      ...result,
      {
        week_of_number: `${count}주차`,
        period: `${first}~${last}`,
        plus: 0,
        minus: 0,
      },
    ];
    count += 1;
  }
  return {
    week_schedule: result,
    income: "0",
    available: "0",
    expense: "0",
  };
};
