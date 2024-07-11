import { getSessionStorage } from "@utils/storage.ts";
import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_TEMPLATE } from "@constants/queryKeys.ts";

const fetchDeleteTemplate = async (id: string) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/asset/template/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ template_id: id }),
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
    },
  });

  const deleteTemplate = async (templates: number[]) => {
    templates.forEach((template) => {
      mutate(template.toString());
    });
  };

  return { deleteTemplate };
};
