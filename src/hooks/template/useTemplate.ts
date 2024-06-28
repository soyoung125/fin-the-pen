import { useAppDispatch } from "@redux/hooks.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useTemplates } from "@app/tanstack-query/templates/useTemplates.ts";
import { useTemplateSchedule } from "@app/tanstack-query/templates/useTemplateSchedule.ts";

const useTemplate = () => {
  const dispatch = useAppDispatch();

  const { data: user } = useUser();
  const { getTemplate } = useTemplateSchedule();
  const { data, isPending, isError } = useTemplates({
    user_id: user?.user_id ?? "",
  });
  const getTemplateData = (template_id: number, template_name: string) =>
    getTemplate({ template_id, template_name });

  return {
    templates: data,
    isPending,
    isError,
    getTemplateData,
  };
};

export default useTemplate;
