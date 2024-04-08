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
    categoryDetail: {
      식비: "1000000",
      카페: "10000",
      술: "?",
    },
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
