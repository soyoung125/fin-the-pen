import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getCookie } from "@utils/storage.ts";
import { QUERY_KEY_DAY, QUERY_KEY_SCHEDULES } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { HomeQuery, DaySchedule } from "@app/types/schedule.ts";

const fetchDaySchedules = async (query: HomeQuery) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/home/day`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<DaySchedule>(async (res) => {
    if (!res.ok) {
      return init_data;
    }
    return res.json();
  });
};

export const useDaySchedules = (query: HomeQuery) => {
  return useQuery({
    queryKey: [
      QUERY_KEY_SCHEDULES,
      query.main_month,
      QUERY_KEY_DAY,
      query.calendar_date,
    ],
    queryFn: () => fetchDaySchedules(query),
    retry: 1,
  });
};

const init_data = {
  income: "0",
  expect: "0",
  dayExpense: "0",
  schedule_count: 0,
  available: "0",
};
