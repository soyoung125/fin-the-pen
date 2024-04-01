import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_GOAL } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { Goal } from "@app/types/asset.ts";

const fetchGoal = async (user_id: string) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/target-amount?userId=${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<Goal>(async (res) => {
    return res.json();
  });
};

export const useGoals = (user_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_GOAL, user_id],
    queryFn: () => fetchGoal(user_id),
  });
};
