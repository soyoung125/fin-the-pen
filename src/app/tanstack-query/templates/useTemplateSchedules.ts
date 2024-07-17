import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_TEMPLATE_SCHEDULES } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import {
  TemplateSchedulesRequest,
  TemplateSchedulesResponse,
} from "@app/types/template.ts";

const fetchTemplates = async (query: TemplateSchedulesRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(
    `${DOMAIN}/asset/template/schedule/info?user_id=${query.user_id}&template_id=${query.template_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then<TemplateSchedulesResponse>(async (res) => {
    if (!res.ok) {
      return null;
    }
    return res.json();
  });
};

export const useTemplateSchedules = (query: TemplateSchedulesRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY_TEMPLATE_SCHEDULES, query.template_id],
    queryFn: () => fetchTemplates(query),
  });
};
