import RegularScheduleCard from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleCard/index.ts";
import { Meta } from "@storybook/react";
import { ConsumptionCardProps } from "@components/ScheduleList/ScheduleCard/ScheduleCard.tsx";

const meta = {
  title: "AssetManagement/RegularAsset/RegularScheduleCard",
  component: RegularScheduleCard,
  tags: ["autodocs"],
  args: {
    eventName: "커피",
    title: "매주 금요일",
    category: "외식",
    amount: 3000,
    priceType: "-",
    isRepeat: false,
  },
  argTypes: {},
} satisfies Meta<typeof RegularScheduleCard>;

export default meta;

export const Default = (args: ConsumptionCardProps) => {
  return <RegularScheduleCard {...args} icon />;
};
