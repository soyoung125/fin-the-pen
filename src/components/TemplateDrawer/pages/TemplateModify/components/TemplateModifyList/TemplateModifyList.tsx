import { FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@components/common/CheckBox";
import TemplateModifyListItem from "components/TemplateDrawer/pages/TemplateModify/components/TemplateModifyList/components/TemplateModifyListItem";
import { Template } from "@app/types/template.ts";

export interface TemplateModifyListProps {
  templates: Template[];
  selected: number[];
  handleChange: (t: number) => void;
}

function TemplateModifyList({
  templates,
  selected,
  handleChange,
}: TemplateModifyListProps) {
  return (
    <>
      <FormGroup>
        {templates.map((template) => (
          <FormControlLabel
            key={template.id}
            sx={{ padding: 2.5 }}
            control={
              <CheckBox
                checked={selected.includes(template.id)}
                handleChange={() => handleChange(template.id)}
              />
            }
            label={<TemplateModifyListItem template={template} />}
            slotProps={{
              typography: {
                flexGrow: 1,
              },
            }}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default TemplateModifyList;
