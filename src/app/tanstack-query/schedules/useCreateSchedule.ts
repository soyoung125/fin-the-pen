import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import {
  QUERY_KEY_REGULAR_ASSET,
  QUERY_KEY_SCHEDULES,
} from "@constants/queryKeys";
import { getPriceType } from "@components/ScheduleDrawer/hooks/useScheduleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestSchedule } from "@app/types/schedule.ts";
import moment from "moment";

const fetchCreateSchedule = async (schedule: RequestSchedule) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");
  const data = {
    ...schedule,
    price_type: getPriceType(schedule.price_type),
  };

  return fetch(`${DOMAIN}/createSchedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchCreateSchedule,
    onSuccess: async (data, variables) => {
      const date = moment(variables.start_date);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SCHEDULES, date.format("YYYY-MM")],
      });

      if (variables.repeat.kind_type !== "none") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_REGULAR_ASSET],
        });
      }
    },
  });

  const createSchedule = (schedule: RequestSchedule) => {
    mutate(schedule);
  };

  return { createSchedule };
};
