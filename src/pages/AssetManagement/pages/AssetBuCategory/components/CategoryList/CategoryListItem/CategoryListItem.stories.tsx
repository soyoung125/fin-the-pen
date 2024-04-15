import CategoryListItem, {
  CategoryListItemProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/CategoryListItem.tsx";
import { Meta } from "@storybook/react";
import { EXPENDITURE_FOOD_CATEGORY } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";

const meta = {
  title: "AssetManagement/AssetByCategory/CategoryList/CategoryListItem",
  component: CategoryListItem,
  tags: ["autodocs"],
  args: {
    category: "음식",
    subCategories: EXPENDITURE_FOOD_CATEGORY,
    categoryDetail: [
      { name: "식비", value: "1000000" },
      { name: "카페", value: "10000" },
      { name: "술", value: "?" },
    ],
    amount: 100000000,
    handleCancel: () => alert("cancel"),
    handleSubmit: () => alert("submit"),
  },
  argTypes: {},
} satisfies Meta<typeof CategoryListItem>;

export default meta;

export const Default = (args: CategoryListItemProps) => {
  return <CategoryListItem {...args} />;
};
