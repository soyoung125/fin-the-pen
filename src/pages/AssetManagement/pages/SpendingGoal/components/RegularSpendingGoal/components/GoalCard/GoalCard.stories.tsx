import GoalCard from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/GoalCard/GoalCard.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/SpendingGoal/RegularSpendingGoal/GoalCard",
  component: GoalCard,
  tags: ["autodocs"],
  args: { title: "지출 목표액", start: <>한달 목표</>, end: <>100000 원</> },
  argTypes: {},
} satisfies Meta<typeof GoalCard>;

export default meta;
