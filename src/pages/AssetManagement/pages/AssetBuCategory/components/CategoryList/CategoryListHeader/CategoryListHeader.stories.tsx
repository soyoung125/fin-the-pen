import CategoryListHeader, {
  CategoryListHeaderProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListHeader/CategoryListHeader.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/AssetByCategory/CategoryList/CategoryListHeader",
  component: CategoryListHeader,
  tags: ["autodocs"],
  args: { handleReset: () => alert("reset") },
  argTypes: {},
} satisfies Meta<typeof CategoryListHeader>;

export default meta;

export const Default = (args: CategoryListHeaderProps) => {
  return <CategoryListHeader {...args} />;
};
