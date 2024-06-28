import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { TemplateScheduleRequest } from "@app/types/template.ts";

const fetchTemplateSchedule = async (query: TemplateScheduleRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(`${DOMAIN}/createSchedule/template`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });
};

export const useTemplateSchedule = () => {
  const { mutate } = useMutation({
    mutationFn: fetchTemplateSchedule,
    onSuccess: async (res) => {
      const response = await res.json();
      return response.data;
    },
  });

  const getTemplate = (query: TemplateScheduleRequest) => {
    mutate(query);
  };

  return { getTemplate };
};
