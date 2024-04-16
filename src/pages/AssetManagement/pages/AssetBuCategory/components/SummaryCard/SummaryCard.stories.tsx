import SummaryCard, {
  SummaryCardProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard/SummaryCard.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/AssetByCategory/SummaryCard",
  component: SummaryCard,
  tags: ["autodocs"],
  args: {
    used: 700000,
    goal: 1000000,
    ratio: 70,
    handleSetting: () => alert("click"),
  },
  argTypes: {},
} satisfies Meta<typeof SummaryCard>;

export default meta;

export const Default = (args: SummaryCardProps) => {
  return <SummaryCard {...args} />;
};
