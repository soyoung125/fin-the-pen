import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_TEMPLATE } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { TemplateRequest, Templates } from "@app/types/template.ts";

const fetchTemplates = async (query: TemplateRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/template/details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  }).then<Templates>(async (res) => {
    if (!res.ok) {
      return [];
    }
    return res.json();
  });
};

export const useTemplates = (query: TemplateRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY_TEMPLATE],
    queryFn: () => fetchTemplates(query),
  });
};
