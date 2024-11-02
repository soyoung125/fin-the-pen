import { getCookie } from "@utils/storage.ts";
import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";
import { DOMAIN } from "@api/url.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_TEMPLATE_SCHEDULES } from "@constants/queryKeys.ts";

const fetchDeleteTemplateSchedules = async (id: string) => {
  const token = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  return fetch(`${DOMAIN}/asset/template/delete/selected_schedule`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ schedule_id_list: id }),
  });
};

export const useDeleteTemplateSchedules = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fetchDeleteTemplateSchedules,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TEMPLATE_SCHEDULES],
      });
    },
  });

  const deleteTemplateSchedules = async (templates: string) => {
    mutate(templates);
  };

  return { deleteTemplateSchedules };
};
