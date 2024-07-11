import { useTemplates } from "@app/tanstack-query/templates/useTemplates.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import {
  selectSelectedTemplate,
  setDrawerScheduleForm,
  setSelectedTemplate,
} from "@redux/slices/scheduleSlice.tsx";
import { useTemplateSchedule } from "@app/tanstack-query/templates/useTemplateSchedule.ts";
import { Template } from "@app/types/template.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";

const useScheduleTemplate = () => {
  const selectedTemplate = useAppSelector(selectSelectedTemplate);
  const dispatch = useAppDispatch();

  const { data: user } = useUser();
  const { getTemplate } = useTemplateSchedule();

  const {
    data: templates,
    isPending,
    isError,
  } = useTemplates({
    user_id: user?.user_id ?? "",
  });

  const setSelected = async (t: Template) => {
    dispatch(setSelectedTemplate(t));
    const result = await getTemplate({
      template_id: t.id.toString(),
      template_name: t.template_name,
    });
    dispatch(
      setDrawerScheduleForm(
        SCHEDULE_REQUEST({ ...result, schedule_id: undefined })
      )
    );
  };

  return {
    templates,
    isPending,
    isError,
    selectedTemplate,
    setSelected,
  };
};

export default useScheduleTemplate;