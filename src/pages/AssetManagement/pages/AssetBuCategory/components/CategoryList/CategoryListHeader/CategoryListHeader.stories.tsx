import CategoryListHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListHeader/CategoryListHeader.tsx";
import { Meta } from "@storybook/react";

const meta = {
  title: "AssetManagement/AssetByCategory/CategoryList/CategoryListHeader",
  component: CategoryListHeader,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof CategoryListHeader>;

export default meta;

export const Default = () => {
  return <CategoryListHeader />;
};
