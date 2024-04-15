import useAssetByCategory from "@hooks/assetManagement/useAssetByCategory.ts";
import SelectMonth from "@pages/AssetManagement/pages/AssetBuCategory/components/SelectMonth";
import SummaryCard from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard";
import moment from "moment";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CategoryListHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListHeader";
import { EXPENDITURE_CATEGORY } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";
import CategoryListItem from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem";

function AssetByCategory() {
  const { yearMonth, assetsByCategory, pickMonth, getCategoryList } =
    useAssetByCategory();

  return (
    <>
      <SelectMonth
        date={moment(yearMonth).format("YYYY년 M월")}
        handleClick={pickMonth}
      />
      <SummaryCard
        used={Number(assetsByCategory?.category_total)}
        goal={Number(assetsByCategory?.spend_goal_amount)}
        ratio={parseInt(assetsByCategory?.ratio ?? "0")}
        handleSetting={() => alert("click")}
      />
      <ThickDivider />

      <CategoryListHeader handleReset={() => alert("reset")} />
      {EXPENDITURE_CATEGORY.map((category) => {
        const categoryList = getCategoryList(category);
        return (
          <CategoryListItem
            category={categoryList.category_name}
            subCategories={category.subCategory}
            categoryDetail={categoryList.list}
            amount={Number(categoryList.category_total)}
            handleCancel={() => alert("cancel")}
            handleSubmit={() => alert("submit")}
          />
        );
      })}
    </>
  );
}

export default AssetByCategory;
