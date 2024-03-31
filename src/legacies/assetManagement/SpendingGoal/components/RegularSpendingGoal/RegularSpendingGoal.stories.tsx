import { Meta } from "@storybook/react";
import RegularSpendingGoal from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/index.ts";
import { RegularSpendingGoalProps } from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.tsx";
import { useState } from "react";
import { Form } from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/ModifyRegularSpendingGoal.tsx";

const meta = {
  title: "AssetManagement/SpendingGoal/RegularSpendingGoal",
  component: RegularSpendingGoal,
  tags: ["autodocs"],
  args: {
    handleModify: () => alert("modify"),
    isModify: false,
    goal: "100000",
    startDate: "2024-01",
    endDate: "2024-02",
  },
  argTypes: {},
} satisfies Meta<typeof RegularSpendingGoal>;

export default meta;

export const Default = (args: RegularSpendingGoalProps) => {
  return <RegularSpendingGoal {...args} />;
};

export const Example = () => {
  const [isModify, setIsModify] = useState(false);
  const [value, setValue] = useState({
    goal: "10000000",
    start_date: "2024-01",
    end_date: "2024-02",
  });
  const handleSubmit = (form: Form) => {
    setIsModify(false);
    setValue(form);
  };
  return (
    <RegularSpendingGoal
      handleModify={() => setIsModify(true)}
      handleSubmit={handleSubmit}
      closeModify={() => setIsModify(false)}
      isModify={isModify}
      goal={value.goal}
      startDate={value.start_date}
      endDate={value.end_date}
    />
  );
};
