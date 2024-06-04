import { Meta } from "@storybook/react";
import TemplateModifyListItem, {
  TemplateModifyListItemProps,
} from "@components/TemplateDrawer/pages/TemplateModifyList/components/TemplateModifyListItem/TemplateModifyListItem.tsx";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@components/common/CheckBox";
import { Schedule } from "@app/types/schedule.ts";

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

export const Example = () => {
  const schedules: Schedule[] = [
    {
      schedule_id: "0",
      event_name: "아름다운 클리닉",
      category: "뷰티/미용",
      start_date: "2024-01-01",
      end_date: "2024-01-01",
      start_time: "08:00",
      end_time: "08:00",
      period: {
        is_repeat_again: true,
        repeat_number_time: "1",
        repeat_end_line: "2025-01-01",
      },
      price_type: "-",
      payment_type: "card",
      fix_amount: false,
      amount: "20000",
      all_day: true,
      exclude: false,
      repeat_kind: "MONTH",
      repeat_options: {
        term: "5",
        options: "1",
      },
    },
    {
      schedule_id: "1",
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
      price_type: "-",
      payment_type: "card",
      fix_amount: false,
      amount: "1000000",
      all_day: true,
      exclude: false,
      repeat_kind: "MONTH",
      repeat_options: {
        term: "14",
        options: "1",
      },
    },
    {
      schedule_id: "2",
      event_name: "KB 손해보험",
      category: "금융수입",
      start_date: "2024-01-01",
      end_date: "2024-01-01",
      start_time: "08:00",
      end_time: "08:00",
      period: {
        is_repeat_again: true,
        repeat_number_time: "1",
        repeat_end_line: "2025-01-01",
      },
      price_type: "-",
      payment_type: "card",
      fix_amount: false,
      amount: "140000",
      all_day: true,
      exclude: false,
      repeat_kind: "MONTH",
      repeat_options: {
        term: "24",
        options: "1",
      },
    },
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected(selected.concat(id));
    }
  };

  return (
    <FormGroup>
      {schedules.map(
        (schedule) =>
          schedule.schedule_id && (
            <FormControlLabel
              control={
                <CheckBox
                  checked={selected.includes(schedule.schedule_id)}
                  handleChange={() => handleChange(schedule.schedule_id ?? "0")}
                />
              }
              label={<TemplateModifyListItem schedule={schedule} />}
              slotProps={{
                typography: {
                  flexGrow: 1,
                },
              }}
            />
          )
      )}
    </FormGroup>
  );
};
