import ListItem, {
  ListItemProps,
} from "@components/TemplateDrawer/components/ListItem/ListItem.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "ui/TemplateDrawer/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  args: { category: "급여", title: "ABC회사 월급", amount: 100000 },
  argTypes: {},
} satisfies Meta<typeof ListItem>;

export default meta;

export const Default = (args: ListItemProps) => {
  return <ListItem {...args} />;
};
