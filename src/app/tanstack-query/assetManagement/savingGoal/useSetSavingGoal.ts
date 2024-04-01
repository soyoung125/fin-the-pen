import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { QUERY_KEY_GOAL, QUERY_KEY_SCHEDULES } from "@constants/queryKeys";
import { getPriceType } from "@components/ScheduleDrawer/hooks/useScheduleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestSchedule } from "@app/types/schedule.ts";
import moment from "moment";
import { setSavingGoalQuery } from "@app/types/asset.ts";

const fetchSetSavingGoal = async (query: setSavingGoalQuery) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

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
        queryKey: [QUERY_KEY_GOAL, variables.user_id],
      });
    },
  });

  const setSavingGoal = (query: setSavingGoalQuery) => {
    mutate(query);
  };

  return { setSavingGoal };
};
