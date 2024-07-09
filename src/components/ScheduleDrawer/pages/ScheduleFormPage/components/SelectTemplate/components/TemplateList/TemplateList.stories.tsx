import TemplateList from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/index.ts";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { TemplateListProps } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/TemplateList.tsx";

const meta = {
  title: "ui/ScheduleDrawer/SelectTemplate/TemplateList",
  component: TemplateList,
  tags: ["autodocs"],
  args: {
    templates: [
      {
        id: 1,
        template_name: "이전 템플릿",
        category_name: "식비",
        statement: "",
        user_id: "user",
        amount: "1000",
      },
    ],
    selected: 1,
  },
} satisfies Meta<typeof TemplateList>;

export default meta;

export const Default = (args: TemplateListProps) => {
  return <TemplateList {...args} />;
};

export const Empty = () => {
  const [selected, setSelected] = useState(0);

  return (
    <TemplateList
      templates={[]}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export const Example = () => {
  const templates = [
    {
      id: 1,
      template_name: "이전 템플릿",
      category_name: "식비",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
    {
      id: 2,
      template_name: "이전 템플릿",
      category_name: "식비",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
    {
      id: 3,
      template_name: "이전 템플릿",
      category_name: "식비",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
  ];
  const [selected, setSelected] = useState(0);

  const handleSelect = (id: number) => setSelected(id);

  return (
    <TemplateList
      templates={templates}
      selected={selected}
      setSelected={handleSelect}
    />
  );
};
