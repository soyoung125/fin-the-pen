import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_TEMPLATE } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { Template, TemplateRequest } from "@app/types/template.ts";

const fetchTemplates = async (query: TemplateRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/template/details?user_id=${query.user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<Template[]>(async (res) => {
    if (!res.ok) {
      return [];
    }
    const response = await res.json();
    return response.data;
  });
};

export const useTemplates = (query: TemplateRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY_TEMPLATE],
    queryFn: () => fetchTemplates(query),
  });
};
