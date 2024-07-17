import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_TEMPLATE_SCHEDULES } from "@constants/queryKeys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModifyTemplateSchedulesRequest,
  TemplateByPriceType,
} from "@app/types/template.ts";

const fetchModifyTemplateSchedules = async (
  query: ModifyTemplateSchedulesRequest
) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/template/modify/selected_schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<TemplateByPriceType>(async (res) => {
    if (!res.ok) {
      return [];
    }
    return res.json();
  });
};

export const useModifyTemplateSchedules = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchModifyTemplateSchedules,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE_SCHEDULES, variables.template_id],
      });
    },
  });

  const modifyTemplateSchedules = async (
    query: ModifyTemplateSchedulesRequest
  ) => {
    mutate(query);
  };

  return { modifyTemplateSchedules };
};
