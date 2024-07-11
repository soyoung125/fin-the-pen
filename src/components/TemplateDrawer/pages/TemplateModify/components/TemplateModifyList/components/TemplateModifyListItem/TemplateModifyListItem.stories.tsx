import { Meta } from "@storybook/react";
import TemplateModifyListItem, {
  TemplateModifyListItemProps,
} from "@components/TemplateDrawer/pages/TemplateModify/components/TemplateModifyList/components/TemplateModifyListItem/TemplateModifyListItem.tsx";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@components/common/CheckBox";
import { Template } from "@app/types/template.ts";

const meta = {
  title: "ui/TemplateDrawer/TemplateList/TemplateModifyListItem",
  component: TemplateModifyListItem,
  tags: ["autodocs"],
  args: {
    template: {
      id: 0,
      template_name: "아름다운 클리닉",
      category_name: "뷰티/미용",
      user_id: "user",
      statement: "",
      amount: "20000",
    },
  },
  argTypes: {},
} satisfies Meta<typeof TemplateModifyListItem>;

export default meta;

export const Default = (args: TemplateModifyListItemProps) => {
  return <TemplateModifyListItem {...args} />;
};

export const Example = () => {
  const schedules: Template[] = [
    {
      id: 0,
      template_name: "아름다운 클리닉",
      category_name: "뷰티/미용",
      user_id: "user",
      statement: "",
      amount: "20000",
    },
    {
      id: 1,
      template_name: "ABC회사 월급",
      category_name: "급여",
      user_id: "user",
      statement: "",
      amount: "1000000",
    },
    {
      id: 2,
      template_name: "KB 손해보험",
      category_name: "금융수입",
      user_id: "user",
      statement: "",
      amount: "140000",
    },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  return (
    <FormGroup>
      {schedules.map((template) => (
        <FormControlLabel
          key={template.id}
          sx={{ margin: "20px" }}
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
  );
};
