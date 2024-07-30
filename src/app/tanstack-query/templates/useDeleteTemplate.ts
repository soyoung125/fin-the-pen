import { getSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_TEMPLATE_BY_PRICE_TYPE } from "@constants/queryKeys.ts";

const fetchDeleteTemplate = async (ids: string[]) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/template/delete?${ids.join("&")}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchDeleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE_BY_PRICE_TYPE],
      });
    },
  });

  const deleteTemplate = async (templates: number[]) => {
    mutate(templates.map((template) => `template_ids=${template}`));
  };

  return { deleteTemplate };
};
