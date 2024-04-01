import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { QUERY_KEY_GOAL } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetPersonalGoalQuery } from "@app/types/asset.ts";

const fetchSetPersonalGoal = async (query: SetPersonalGoalQuery) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/personal-goal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useSetPersonalGoal = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchSetPersonalGoal,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GOAL, variables.user_id],
      });
    },
  });

  const setPersonalGoal = (query: SetPersonalGoalQuery) => {
    mutate(query);
  };

  return { setPersonalGoal };
};
