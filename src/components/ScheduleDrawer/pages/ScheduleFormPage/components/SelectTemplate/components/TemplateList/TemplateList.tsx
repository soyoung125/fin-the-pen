import {
  EmptyTemplateBadge,
  TemplateBadge,
  TemplateListContainer,
} from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/TemplateList.styles.ts";
import { Template } from "@app/types/template.ts";
import TemplateIconSVG from "@components/common/TemplateIconSVG";

export interface TemplateListProps {
  templates?: Template[];
  selected: Template;
  setSelected: (t: Template) => void;
}

function TemplateList({ templates, selected, setSelected }: TemplateListProps) {
  if (!templates || templates.length === 0)
    return (
      <TemplateListContainer>
        <EmptyTemplateBadge>기록된 일정이 없어요</EmptyTemplateBadge>
      </TemplateListContainer>
    );

  return (
    <TemplateListContainer>
      {templates.map((t) => (
        <TemplateBadge
          key={t.id}
          $selected={selected.id === t.id}
          onClick={() => setSelected(t)}
        >
          <TemplateIconSVG id={t.category_name} />
          {t.template_name}
        </TemplateBadge>
      ))}
    </TemplateListContainer>
  );
}

export default TemplateList;
