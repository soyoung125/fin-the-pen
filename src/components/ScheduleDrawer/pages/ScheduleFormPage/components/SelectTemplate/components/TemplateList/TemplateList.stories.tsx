import TemplateList from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/index.ts";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { TemplateListProps } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate/components/TemplateList/TemplateList.tsx";
import { Template } from "@app/types/template.ts";

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
    selected: {
      id: 1,
      template_name: "이전 템플릿",
      category_name: "식비",
      statement: "",
      user_id: "user",
      amount: "1000",
    },
  },
} satisfies Meta<typeof TemplateList>;

export default meta;

export const Default = (args: TemplateListProps) => {
  return <TemplateList {...args} />;
};

export const Empty = () => {
  return (
    <TemplateList
      templates={[]}
      setSelected={(t: Template) => {}}
      selected={{
        id: -1,
        template_name: "",
        category_name: "",
        statement: "",
        user_id: "",
        amount: "",
      }}
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
  const [selected, setSelected] = useState({
    id: 1,
    template_name: "이전 템플릿",
    category_name: "식비",
    statement: "",
    user_id: "user",
    amount: "1000",
  });

  const handleSelect = (t: Template) => setSelected(t);

  return (
    <TemplateList
      templates={templates}
      selected={selected}
      setSelected={handleSelect}
    />
  );
};
