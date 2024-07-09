import { Template } from "@app/types/template.ts";
import TemplateListItem from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem";

export interface TemplateListProps {
  templates: Template[];
  setSelected: (t: Template) => void;
}

function TemplateList({ templates, setSelected }: TemplateListProps) {
  return templates.map((template) => (
    <TemplateListItem
      schedule={template}
      handleClick={() => setSelected(template)}
      hideAmount
    />
  ));
}

export default TemplateList;
