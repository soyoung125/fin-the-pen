import { Meta } from "@storybook/react";
import ConsumptionCard, { ConsumptionCardProps } from "./ConsumptionCard.tsx";

const meta = {
  title: "reports/ReportCategoryDetails/ConsumptionCard",
  component: ConsumptionCard,
  tags: ["autodocs"],
  args: {
    name: "커피",
    type: "-",
    price: 3000,
    startTime: "08:00",
    endTime: "11:00",
    isRepeat: true,
  },
  argTypes: {},
} satisfies Meta<typeof ConsumptionCard>;

export default meta;

export const Default = (args: ConsumptionCardProps) => {
  return <ConsumptionCard {...args} />;
};
