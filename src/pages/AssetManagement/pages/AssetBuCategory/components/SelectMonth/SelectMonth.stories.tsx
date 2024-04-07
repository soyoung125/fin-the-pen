import SelectMonth, {
  SelectMonthProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/SelectMonth/SelectMonth.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/AssetByCategory/SelectMonth",
  component: SelectMonth,
  tags: ["autodocs"],
  args: { date: "2024년 4월", handleClick: () => alert("change!") },
  argTypes: {},
} satisfies Meta<typeof SelectMonth>;

export default meta;

export const Default = (args: SelectMonthProps) => {
  return <SelectMonth {...args} />;
};
