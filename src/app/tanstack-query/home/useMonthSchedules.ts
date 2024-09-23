import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_MONTH, QUERY_KEY_SCHEDULES } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { HomeQuery, MonthSchedule } from "@app/types/schedule.ts";

const fetchMonthSchedules = async (query: HomeQuery) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/home/month`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<MonthSchedule>(async (res) => {
    if (!res.ok) {
      return init_data;
    }
    return res.json();
  });
};

export const useMonthSchedules = (query: HomeQuery) => {
  return useQuery({
    queryKey: [QUERY_KEY_SCHEDULES, query.main_month, QUERY_KEY_MONTH],
    queryFn: () => fetchMonthSchedules(query),
    retry: 1,
  });
};

const init_data = {
  income: "0",
  available: "0",
  today_schedule: [],
  expense: "0",
};
