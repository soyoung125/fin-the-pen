import GoalSetting, {
  GoalSettingProps
} from "@pages/AssetManagement/pages/SavingGoal/components/GoalSetting/GoalSetting.tsx";
import {Meta} from "@storybook/react";

const meta = {
  title: "AssetManagement/SavingGoal/GoalSetting",
  component: GoalSetting,
  tags: ["autodocs"],
  args: {name: "user"},
  argTypes: {}
} satisfies Meta<typeof GoalSetting>

export default meta;

export const Default = (args: GoalSettingProps) => {
  return <GoalSetting {...args} />
}