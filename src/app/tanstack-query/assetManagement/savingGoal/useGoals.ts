import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getCookie } from "@utils/storage.ts";
import { QUERY_KEY_SAVING_GOAL } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { SavingGoal } from "@app/types/asset.ts";

const fetchGoal = async (user_id: string) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/target-amount?userId=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<SavingGoal>(async (res) => {
    console.log(`${DOMAIN}/asset/target-amount?userId=${user_id}`);
    return res.json();
  });
};

export const useGoals = (user_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_SAVING_GOAL, user_id],
    queryFn: () => fetchGoal(user_id),
  });
};
