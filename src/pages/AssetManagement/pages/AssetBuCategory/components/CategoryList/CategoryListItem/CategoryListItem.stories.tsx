import CategoryListItem, {
  CategoryListItemProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/CategoryListItem.tsx";
import { Meta } from "@storybook/react";
import {
  EXPENDITURE_CATEGORY,
  EXPENDITURE_FOOD_CATEGORY,
} from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";

const meta = {
  title: "AssetManagement/AssetByCategory/CategoryList/CategoryListItem",
  component: CategoryListItem,
  tags: ["autodocs"],
  args: {
    category: EXPENDITURE_CATEGORY[0],
    categoryList: {
      category_name: EXPENDITURE_CATEGORY[0].name,
      category_total: "1010000",
      list: [
        { name: "식비", value: "1000000" },
        {
          name: "카페",
          value: "10000",
        },
        {
          name: "술",
          value: "?",
        },
      ],
    },
    control: "",
    totalAmount: 100000000,
    handleSubmit: () => alert("submit"),
  },
  argTypes: {},
} satisfies Meta<typeof CategoryListItem>;

export default meta;

export const Default = (args: CategoryListItemProps) => {
  return <CategoryListItem {...args} />;
};
