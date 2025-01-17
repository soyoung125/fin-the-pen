import MonthSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal/MonthSpendingGoal.tsx";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";

const meta = {
  title: "AssetManagement/SpendingGoal/MonthSpendingGoal",
  component: MonthSpendingGoal,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof MonthSpendingGoal>;

export default meta;

const useStorybookMonth = () => {
  const [yearMonth, setYearMonth] = useState("2023-05-01");
  const { openMonthPicker } = useDatePicker();

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM-DD"));
  };

  return {
    yearMonth,
    pickMonth,
  };
};

export const Example = () => {
  const { yearMonth, pickMonth } = useStorybookMonth();

  return (
    <MonthSpendingGoal
      date={yearMonth}
      changeYearAndMonth={pickMonth}
      handleModify={() => alert("modify")}
      goal={"10000"}
      spent={"1000"}
    />
  );
};
