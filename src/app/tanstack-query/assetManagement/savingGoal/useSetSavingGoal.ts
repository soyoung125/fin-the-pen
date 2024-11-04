import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getCookie } from "@app/utils/storage";
import { QUERY_KEY_SAVING_GOAL } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setSavingGoalQuery } from "@app/types/asset.ts";

const fetchSetSavingGoal = async (query: setSavingGoalQuery) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/target-amount/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useSetSavingGoal = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchSetSavingGoal,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SAVING_GOAL, variables.user_id],
      });
    },
  });

  const setSavingGoal = (query: setSavingGoalQuery) => {
    mutate(query);
  };

  return { setSavingGoal };
};
