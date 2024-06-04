import RegularScheduleCard from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard/index.ts";
import { Meta } from "@storybook/react";
import { RegularScheduleCardProps } from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard/RegularScheduleCard.tsx";

const meta = {
  title: "AssetManagement/RegularAsset/RegularScheduleCard",
  component: RegularScheduleCard,
  tags: ["autodocs"],
  args: {
    eventName: "커피",
    date: "2024-01-01",
    amount: 3000,
    priceType: "-",
  },
  argTypes: {},
} satisfies Meta<typeof RegularScheduleCard>;

export default meta;

export const Default = (args: RegularScheduleCardProps) => {
  return <RegularScheduleCard {...args} />;
};
