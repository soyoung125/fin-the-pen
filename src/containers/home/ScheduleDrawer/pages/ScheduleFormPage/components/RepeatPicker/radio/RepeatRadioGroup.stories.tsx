import type { Meta } from "@storybook/react";
import { useState } from "react";
import RepeatRadioGroup, { RepeatRadioGroupProps } from "./RepeatRadioGroup";
import RadioLabel from "./RadioLabel";

const meta = {
  title: "ui/ScheduleDrawer/repeat-picker/radio/RepeatRadioGroup",
  component: RepeatRadioGroup,
  tags: ["autodocs"],
  args: {
    value: "is_repeat_again",
  },
  argTypes: {},
} satisfies Meta<typeof RepeatRadioGroup>;

export default meta;

export const Default = (args: RepeatRadioGroupProps) => {
  return (
    <div style={{ width: "500px" }}>
      <RepeatRadioGroup {...args}>
        <RadioLabel value="is_repeat_again" label="계속 반복" />
        <RadioLabel value="repeat_number_time" label={"일정 반복 횟수"} />
      </RepeatRadioGroup>
    </div>
  );
};

export const Dynamics = () => {
  const [value, setValue] = useState("is_repeat_again");
  return (
    <div style={{ width: "500px" }}>
      <RepeatRadioGroup
        value={value}
        handleChange={(value: string) => setValue(value)}
      >
        <RadioLabel value="is_repeat_again" label="계속 반복" />
        <RadioLabel value="repeat_number_time" label={"일정 반복 횟수"} />
        <RadioLabel value="repeat_end_line" label={"종료 날짜"} />
      </RepeatRadioGroup>
    </div>
  );
};
