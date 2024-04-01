import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_SPENDING_GOAL } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { SpendingGoal } from "@app/types/asset.ts";

const fetchSpendingGoal = async (user_id: string) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/target-amount?userId=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<SpendingGoal>(async (res) => {
    return res.json();
  });
};

export const useSpendingGoals = (user_id: string, date: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_SPENDING_GOAL, user_id, date],
    queryFn: () => fetchSpendingGoal(user_id),
  });
};
