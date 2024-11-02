import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@utils/storage.ts";
import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { CategoryDetail, CategoryDetailQuery } from "@app/types/report.ts";
import { QUERY_KEY_REPORT_DETAIL } from "@constants/queryKeys.ts";
import moment from "moment";
import { Schedule } from "@app/types/schedule.ts";

const fetchCategoryDetail = async (query: CategoryDetailQuery) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/report/month/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<CategoryDetail>(async (res) => {
    const response = await res.json();
    const lastDay = moment(query.date, "YYYY-MM").endOf("month").date();

    const arr = Array.from({ length: lastDay }, (_, i) => i + 1);
    const init: { [key: string]: Schedule[] } = {};

    const schedules = await arr.reduce(async (prev, current) => {
      const prevResult = await prev.then();
      const date = moment(`${query.date}-${current}`, "YYYY-MM-D");
      const today = response.list.filter(
        (schedule: Schedule) =>
          date.isSameOrAfter(schedule.start_date) &&
          date.isSameOrBefore(schedule.end_date)
      );
      if (today.length !== 0) {
        return Promise.resolve({
          ...prevResult,
          [date.format("YYYY-MM-DD")]: today,
        });
      } else {
        return Promise.resolve(prevResult);
      }
    }, Promise.resolve(init));

    return {
      month_schedule: schedules,
      count: response.list.length,
      category: query.category,
      category_goal: response.category_goal_amount,
      category_expense: response.currentValue,
      category_expect: response.expectValue,
      category_balance: response.balanceValue,
    };
  });
};

export const useCategoryDetail = (query: CategoryDetailQuery) => {
  return useQuery({
    queryKey: [QUERY_KEY_REPORT_DETAIL, query.date, query.category],
    queryFn: () => fetchCategoryDetail(query),
  });
};
