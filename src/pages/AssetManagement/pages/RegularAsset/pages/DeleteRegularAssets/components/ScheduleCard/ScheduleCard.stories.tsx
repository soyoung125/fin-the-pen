import ScheduleCard from "@pages/AssetManagement/pages/RegularAsset/pages/DeleteRegularAssets/components/ScheduleCard/index.ts";
import { Meta } from "@storybook/react";
import { ScheduleCardProps } from "@pages/AssetManagement/pages/RegularAsset/pages/DeleteRegularAssets/components/ScheduleCard/ScheduleCard.tsx";

const meta = {
  title: "AssetManagement/RegularAsset/DeleteRegularAssets/ScheduleCard",
  component: ScheduleCard,
  tags: ["autodocs"],
  args: {
    id: 1,
    amount: 10000,
    priceType: "+",
    date: "2024-01-01",
    event_name: "월급",
    isSelected: false,
  },
  argTypes: {},
} satisfies Meta<typeof ScheduleCard>;

export default meta;

export const Default = (args: ScheduleCardProps) => {
  return <ScheduleCard {...args} />;
};
