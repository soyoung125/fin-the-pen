import CategoryListItem, {
  CategoryListItemProps,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem/CategoryListItem.tsx";
import { Meta } from "@storybook/react";
import { EXPENDITURE_CATEGORY } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";
import { useState } from "react";

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
  },
  argTypes: {
    category: {
      description:
        "지출 카테고리를 의미합니다. {name: '카테고리명', subCategory: '세부 카테고리 리스트'} 구조입니다.",
    },
    categoryList: {
      description:
        "해당 카테고리의 지출 목표 데이터입니다. category_name은 카테고리명을 의미하며, category_total는 해당 카테고리의 총 지출 목표이고 list는 세부 카테고리의 지출 목표 담고 있습니다.",
    },
    control: {
      description: "수정 모드를 on/off 하기 위해 사용되는 매개변수입니다.",
    },
    setControl: {
      description: "수정 모드로 변환합니다.",
    },
    closeControl: {
      description: "수정모드를 제거합니다.",
    },
    handleSubmit: {
      description: "데이터 수정을 위한 함수입니다.",
    },
    compareTotal: {
      description:
        "카테고리별 자산 합계를 구해 지출 목표와 비교하는 메서드입니다.",
    },
  },
} satisfies Meta<typeof CategoryListItem>;

export default meta;

export const Default = (args: CategoryListItemProps) => {
  const [control, setControl] = useState("");
  return (
    <CategoryListItem
      {...args}
      control={control}
      setControl={setControl}
      closeControl={() => setControl("")}
      handleSubmit={() => alert("submit")}
      compareTotal={(prev, curr) => console.log(prev, curr)}
    />
  );
};
