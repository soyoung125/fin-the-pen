import { Meta } from "@storybook/react";
import RegularSpendingGoal from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/index.ts";
import { RegularSpendingGoalProps } from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.tsx";

const meta = {
  title: "AssetManagement/SpendingGoal/RegularSpendingGoal",
  component: RegularSpendingGoal,
  tags: ["autodocs"],
  args: {
    handleModify: () => alert("modify"),
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
