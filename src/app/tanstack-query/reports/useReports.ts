import {
  COOKIE_KEY_ACCESS_TOKEN,
  SESSION_STORAGE_KEY_REFRESH_TOKEN,
} from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getCookie, getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_REPORT } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { MonthScheduleQuery } from "@app/types/schedule.ts";
import { Report } from "@app/types/report.ts";

const fetchReport = async (query: MonthScheduleQuery) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN); //getSessionStorage(SESSION_STORAGE_KEY_REFRESH_TOKEN, "");
  const { date, user_id } = query;

  return fetch(`${DOMAIN}/report/month?date=${date}&user_id=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    // body: JSON.stringify(query),
  }).then<Report>(async (res) => {
    return res.json();
  });
};

export const useReports = (query: MonthScheduleQuery) => {
  return useQuery({
    queryKey: [QUERY_KEY_REPORT, query.date.slice(0, 7)],
    queryFn: () => fetchReport(query),
  });
};
