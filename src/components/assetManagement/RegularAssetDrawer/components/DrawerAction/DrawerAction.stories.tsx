import DrawerAction from "@components/assetManagement/RegularAssetDrawer/components/DrawerAction/index.ts";
import { Meta } from "@storybook/react";
import { DrawerActionProps } from "@components/assetManagement/RegularAssetDrawer/components/DrawerAction/DrawerAction.tsx";

const meta = {
  title: "ui/RegularAssetDrawer/DrawerAction",
  component: DrawerAction,
  tags: ["autodocs"],
  args: {
    handleCancel: () => alert("cancel"),
    handleSubmit: () => alert("submit"),
  },
  argTypes: {},
} satisfies Meta<typeof DrawerAction>;

export default meta;

export const Default = (args: DrawerActionProps) => {
  return <DrawerAction {...args} />;
};
