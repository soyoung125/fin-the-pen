import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getCookie } from "@app/utils/storage";
import { QUERY_KEY_SCHEDULES } from "@constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestSchedule } from "@app/types/schedule.ts";
import moment from "moment";

interface PropsInterface {
  schedule: RequestSchedule;
  delete_options: string;
  user_id: string;
}

export interface RequestDeleteSchedule {
  schedule_id?: string;
  delete_options: string;
  user_id: string;
}

const fetchDeleteSchedule = async ({
  schedule,
  delete_options,
  user_id,
}: PropsInterface) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);
  const data: RequestDeleteSchedule = {
    schedule_id: schedule.schedule_id,
    delete_options,
    user_id,
  };

  return fetch(`${DOMAIN}/deleteSchedule`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchDeleteSchedule,
    onSuccess: async (data, variables) => {
      const date = moment(variables.schedule.start_date);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SCHEDULES, date.format("YYYY-MM")],
      });
    },
  });

  const deleteSchedule = (
    schedule: RequestSchedule,
    delete_options: string,
    user_id: string
  ) => {
    mutate({ schedule, delete_options, user_id });
  };

  return { deleteSchedule };
};
