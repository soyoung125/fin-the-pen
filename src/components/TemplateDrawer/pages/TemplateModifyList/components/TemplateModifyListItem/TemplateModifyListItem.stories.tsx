import { Meta } from "@storybook/react";
import TemplateModifyListItem, {
  TemplateModifyListItemProps,
} from "@components/TemplateDrawer/pages/TemplateModifyList/components/TemplateModifyListItem/TemplateModifyListItem.tsx";

const meta = {
  title: "ui/TemplateDrawer/TemplateList/TemplateModifyListItem",
  component: TemplateModifyListItem,
  tags: ["autodocs"],
  args: {
    schedule: {
      event_name: "ABC회사 월급",
      category: "급여",
      start_date: "2024-01-01",
      end_date: "2024-01-01",
      start_time: "08:00",
      end_time: "08:00",
      period: {
        is_repeat_again: true,
        repeat_number_time: "1",
        repeat_end_line: "2025-01-01",
      },
      price_type: "+",
      payment_type: "card",
      fix_amount: false,
      amount: "1000000",
      all_day: true,
      exclude: false,
      repeat_kind: "MONTH",
      repeat_options: {
        term: "1",
        options: "1",
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof TemplateModifyListItem>;

export default meta;

export const Default = (args: TemplateModifyListItemProps) => {
  return <TemplateModifyListItem {...args} />;
};
