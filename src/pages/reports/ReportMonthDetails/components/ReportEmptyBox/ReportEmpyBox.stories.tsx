import { Meta } from "@storybook/react";
import ReportEmptyBox from "@pages/reports/ReportMonthDetails/components/ReportEmptyBox";
import { ReportEmptyBoxProps } from "@pages/reports/ReportMonthDetails/components/ReportEmptyBox/ReportEmptyBox.tsx";

const meta = {
  title: "reports/ReportMonthDetails/ReportEmpty",
  component: ReportEmptyBox,
  tags: ["autodocs"],
  args: {
    handleClickAddSchedule: () => alert("add schedule"),
    mode: "schedule",
  },
  argTypes: {},
} satisfies Meta<typeof ReportEmptyBox>;

export default meta;

export const Default = (args: ReportEmptyBoxProps) => {
  return <ReportEmptyBox {...args} />;
};
