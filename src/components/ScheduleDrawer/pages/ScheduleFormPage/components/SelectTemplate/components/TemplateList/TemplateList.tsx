import {
  EmptyTemplateBadge,
  TemplateBadge,
} from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/TemplateList.styles.ts";
import { Stack } from "@mui/material";
import { Template } from "@app/types/template.ts";

export interface TemplateListProps {
  templates?: Template[];
  selected?: Template;
  setSelected: (t: Template) => void;
}

function TemplateList({ templates, selected, setSelected }: TemplateListProps) {
  if (!templates || templates.length === 0)
    return <EmptyTemplateBadge>기록된 일정이 없어요</EmptyTemplateBadge>;

  return (
    <Stack direction="row" spacing={1}>
      {templates.map((t) => (
        <TemplateBadge
          key={t.id}
          $selected={selected === t}
          onClick={() => setSelected(t)}
        >
          {t.template_name}
        </TemplateBadge>
      ))}
    </Stack>
  );
}

export default TemplateList;
