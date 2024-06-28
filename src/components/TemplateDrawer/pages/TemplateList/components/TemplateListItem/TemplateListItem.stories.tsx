import TemplateListItem, {
  TemplateListItemProps,
} from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem/TemplateListItem.tsx";
import { Meta } from "@storybook/react";
import { SchedulePeriod } from "@app/types/schedule.ts";

const meta = {
  title: "ui/TemplateDrawer/TemplateList/TemplateListItem",
  component: TemplateListItem,
  tags: ["autodocs"],
  args: {
    schedule: {
      id: 2,
      user_id: "test1234",
      template_name: "월급",
      category_name: "급여",
      statement: "DEPOSIT",
      amount: "150000000",
    },
  },
  argTypes: {},
} satisfies Meta<typeof TemplateListItem>;

export default meta;

export const Default = (args: TemplateListItemProps) => {
  return <TemplateListItem {...args} />;
};
