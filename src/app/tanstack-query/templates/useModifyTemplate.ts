import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getCookie } from "@utils/storage.ts";
import {
  QUERY_KEY_TEMPLATE_BY_PRICE_TYPE,
  QUERY_KEY_TEMPLATE_SCHEDULES,
} from "@constants/queryKeys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModifyTemplateRequest } from "@app/types/template.ts";

const fetchModifyTemplate = async (query: ModifyTemplateRequest) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/template/modify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useModifyTemplate = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchModifyTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE_BY_PRICE_TYPE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE_SCHEDULES],
      });
    },
  });

  const modifyTemplate = async (query: ModifyTemplateRequest) => {
    mutate(query);
  };

  return { modifyTemplate };
};
