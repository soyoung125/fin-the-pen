import AddRegularSchedule, {
  AddRegularScheduleProps,
} from "@pages/AssetManagement/pages/RegularAsset/components/AddRegularSchedule/AddRegularSchedule.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/RegularAsset/AddRegularSchedule",
  component: AddRegularSchedule,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof AddRegularSchedule>;

export default meta;

export const Default = (args: AddRegularScheduleProps) => {
  return <AddRegularSchedule {...args} />;
};
