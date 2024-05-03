import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { QUERY_KEY_SCHEDULES } from "@constants/queryKeys";
import { getPriceType } from "@components/ScheduleDrawer/hooks/useScheduleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestSchedule } from "@app/types/schedule.ts";
import moment from "moment";

interface PropsInterface {
  schedule: RequestSchedule;
  option: string;
}

export interface RequestModifySchedule extends RequestSchedule {
  modify_options: string;
}

const fetchModifySchedule = async ({ schedule, option }: PropsInterface) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");
  const data: RequestModifySchedule = {
    // 다른 방법을 생각해 봐야 할 것 같음
    ...schedule,
    price_type: getPriceType(schedule.price_type),
    modify_options: option, // all:모두 , nowFromOption: 이후 일정, exceptNowAfter: 현재 일정 제외 이후 일정
  };

  return fetch(`${DOMAIN}/modifySchedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
};

export const useModifySchedule = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ schedule, option }: PropsInterface) =>
      fetchModifySchedule({ schedule, option }),
    onSuccess: async (data, variables) => {
      const date = moment(variables.schedule.start_date);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SCHEDULES, date.format("YYYY-MM")],
      });
    },
  });

  const modifySchedule = (schedule: RequestSchedule, option: string) => {
    mutate({ schedule, option });
  };

  return { modifySchedule };
};
