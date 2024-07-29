import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { getSessionStorage } from "@utils/storage.ts";
import { QUERY_KEY_TEMPLATE_BY_PRICE_TYPE } from "@constants/queryKeys.ts";
import { useQuery } from "@tanstack/react-query";
import { TemplateByPriceType, TemplateRequest } from "@app/types/template.ts";

const fetchTemplates = async (query: TemplateRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/template/view?user_id=${query.user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then<TemplateByPriceType>(async (res) => {
    if (!res.ok) {
      return [];
    }
    return res.json();
  });
};

export const useTemplateByPriceType = (query: TemplateRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY_TEMPLATE_BY_PRICE_TYPE],
    queryFn: () => fetchTemplates(query),
  });
};
