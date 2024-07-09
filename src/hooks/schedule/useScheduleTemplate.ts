import { useTemplates } from "@app/tanstack-query/templates/useTemplates.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import {
  selectSelectedTemplate,
  setSelectedTemplate,
} from "@redux/slices/scheduleSlice.tsx";

const useScheduleTemplate = () => {
  const selectedTemplate = useAppSelector(selectSelectedTemplate);
  const dispatch = useAppDispatch();
  const { data: user } = useUser();
  const {
    data: templates,
    isPending,
    isError,
  } = useTemplates({
    user_id: user?.user_id ?? "",
  });

  const setSelected = (id: number) => dispatch(setSelectedTemplate(id));

  return {
    templates,
    isPending,
    isError,
    selectedTemplate,
    setSelected,
  };
};

export default useScheduleTemplate;
