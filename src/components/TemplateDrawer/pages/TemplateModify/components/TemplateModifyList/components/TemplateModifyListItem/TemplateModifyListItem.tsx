import ListItem from "@components/TemplateDrawer/components/ListItem";
import { Stack } from "@mui/material";
import MenuIcon from "@assets/icons/menu.svg";
import { Template } from "@app/types/template.ts";

export interface TemplateModifyListItemProps {
  template: Template;
}

function TemplateModifyListItem({ template }: TemplateModifyListItemProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ListItem
        category={template.category_name}
        title={template.template_name}
        amount={Number(template.amount)}
        hideAmount
      />

      <img src={MenuIcon} alt="Menu icon" />
    </Stack>
  );
}

export default TemplateModifyListItem;
