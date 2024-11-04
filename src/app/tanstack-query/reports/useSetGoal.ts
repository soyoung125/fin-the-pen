import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getCookie } from "@app/utils/storage";
import { QUERY_KEY_REPORT } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoalResponse } from "@app/types/report.ts";

const fetchSetGoal = async (query: GoalResponse) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/report/set-amount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useSetGoal = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchSetGoal,
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_REPORT, variables.date],
      });
    },
  });

  const setGoal = (query: GoalResponse) => {
    mutate(query);
  };

  return { setGoal };
};
