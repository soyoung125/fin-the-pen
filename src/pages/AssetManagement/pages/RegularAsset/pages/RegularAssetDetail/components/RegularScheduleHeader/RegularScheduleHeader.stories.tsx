import RegularScheduleHeader, {
  RegularScheduleHeaderProps,
} from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader/RegularScheduleHeader.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title:
    "AssetManagement/RegularAsset/RegularAssetDetail/RegularScheduleHeader",
  component: RegularScheduleHeader,
  tags: ["autodocs"],
  args: {
    category: "급여",
    amount: 180000,
    eventName: "월급날",
    startDate: "2024.01.01",
    endDate: "2025.01.01",
  },
  argTypes: {},
} satisfies Meta<typeof RegularScheduleHeader>;

export default meta;

export const Default = (args: RegularScheduleHeaderProps) => {
  return <RegularScheduleHeader {...args} />;
};
