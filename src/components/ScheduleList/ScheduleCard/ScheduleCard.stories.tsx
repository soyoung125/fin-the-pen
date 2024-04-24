import { Meta } from "@storybook/react";
import ScheduleCard, { ConsumptionCardProps } from "./ScheduleCard.tsx";
import ScheduleCardSkeleton from "./ScheduleCardSkeleton.tsx";
import { INIT_PERIOD } from "@constants/schedule.ts";
import moment from "moment";

const meta = {
  title: "ScheduleList/ScheduleCard",
  component: ScheduleCard,
  tags: ["autodocs"],
  args: {
    eventName: "커피",
    title: "08:00-11:00",
    category: "외식",
    amount: 3000,
    priceType: "-",
    isRepeat: false,
  },
  argTypes: {},
} satisfies Meta<typeof ScheduleCard>;

export default meta;

export const Default = (args: ConsumptionCardProps) => {
  return <ScheduleCard {...args} />;
};

export const Skeleton = () => {
  return <ScheduleCardSkeleton />;
};
