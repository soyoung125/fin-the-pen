import { SESSION_STORAGE_KEY_TOKEN } from "@api/keys";
import { DOMAIN } from "@api/url";
import { getSessionStorage } from "@app/utils/storage";
import { useMutation } from "@tanstack/react-query";
import {
  TemplateImportRequest,
  TemplateImportResponse,
  TemplateScheduleRequest,
} from "@app/types/template.ts";
import { Schedule } from "@app/types/schedule.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

const fetchTemplateSchedule = async (query: TemplateScheduleRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(
    `${DOMAIN}/createSchedule/template?template_id=${query.template_id}&template_name=${query.template_name}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(query),
    }
  ).then<Schedule>((res) => {
    return res.json();
  });
};

const fetchTemplateExist = async (query: TemplateImportRequest) => {
  const token = getSessionStorage(SESSION_STORAGE_KEY_TOKEN, "");

  return fetch(
    `${DOMAIN}/template/is_exists?userId=${query.user_id}&category_name=${query.category_name}&event_name=${query.event_name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).then<TemplateImportResponse>((res) => {
    if (!res.ok) {
      return {
        template_data: {
          template_id: "",
          template_name: "",
          category_name: "",
          user_id: "",
        },
      };
    }
    return res.json();
  });
};

export const useTemplateSchedule = () => {
  const { mutateAsync } = useMutation<Schedule, Error, TemplateScheduleRequest>(
    {
      mutationFn: fetchTemplateSchedule,
    }
  );

  const { mutateAsync: existMutate } = useMutation<
    TemplateImportResponse,
    Error,
    TemplateImportRequest
  >({
    mutationFn: fetchTemplateExist,
  });

  const getTemplate = async (query: TemplateScheduleRequest) => {
    return await mutateAsync(query);
  };

  const importTemplate = async (query: TemplateImportRequest) => {
    return await existMutate(query);
  };

  return { getTemplate, importTemplate };
};
