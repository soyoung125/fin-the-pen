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
        name: "이전 템플릿",
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
      name: "이전 템플릿",
    },
    {
      id: 2,
      name: "이전 템플릿",
    },
    {
      id: 3,
      name: "이전 템플릿",
    },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <TemplateList
      templates={templates}
      selected={selected}
      setSelected={setSelected}
    />
  );
};
