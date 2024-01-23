import BarChart, { BarChartProps } from "./BarChart.tsx";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { getColors } from "@pages/reports/ReportCategoryDetails/components/BarChart/utils.ts";

const meta = {
  title: "reports/ReportCategoryDetails/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  args: {
    values: ["used", "predict", "useable"],
    data: [55, 10, 35],
    colors: ["#735BF2", "#DEE0E3", "#F7F7F8"],
    selected: "used",
  },
  argTypes: {},
} satisfies Meta<typeof BarChart>;

export default meta;

export const Default = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const Example = () => {
  const [selected, setSelected] = useState("used");
  const data = [55, 10, 35];
  const values = ["used", "predict", "useable"];
  const colors = getColors(selected);

  return (
    <BarChart
      values={values}
      data={data}
      colors={colors}
      selected={selected}
      setSelected={setSelected}
    />
  );
};
