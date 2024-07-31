import { getSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEY_SCHEDULES,
  QUERY_KEY_TEMPLATE,
} from "@constants/queryKeys.ts";

const fetchDeleteTemplate = async (templates: number[]) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  const ids = templates.map((template) => `template_ids=${template}`);
  return fetch(`${DOMAIN}/asset/template/delete?${ids.join("&")}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ template_ids: templates }),
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchDeleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_SCHEDULES],
      });
    },
  });

  const deleteTemplate = async (templates: number[]) => {
    mutate(templates);
  };

  return { deleteTemplate };
};
