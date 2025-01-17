import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getCookie } from "@utils/storage.ts";
import { QUERY_KEY_SPENDING_GOAL } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { SpendingGoal } from "@app/types/asset.ts";

const fetchSpendingGoal = async (user_id: string, date: string) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(
    `${DOMAIN}/asset/spend-goal/view?userId=${user_id}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then<SpendingGoal>(async (res) => {
    return res.json();
  });
};

export const useSpendingGoals = (user_id: string, date: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_SPENDING_GOAL, user_id, date],
    queryFn: () => fetchSpendingGoal(user_id, date),
  });
};
