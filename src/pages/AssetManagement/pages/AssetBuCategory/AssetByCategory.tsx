import useAssetByCategory from "@hooks/assetManagement/useAssetByCategory.ts";
import SelectMonth from "@pages/AssetManagement/pages/AssetBuCategory/components/SelectMonth";
import SummaryCard from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard";
import moment from "moment";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CategoryListHeader from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListHeader";
import { EXPENDITURE_CATEGORY } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/constants.ts";
import CategoryListItem from "@pages/AssetManagement/pages/AssetBuCategory/components/CategoryList/CategoryListItem";
import { setAssetByCategory } from "@app/types/asset.ts";
import { useState } from "react";
import { useToast } from "@hooks/toast/useToast.tsx";

function AssetByCategory() {
  const {
    yearMonth,
    assetsByCategory,
    isPending,
    pickMonth,
    getCategoryList,
    setAssetByCategory,
    deleteAssetByCategory,
  } = useAssetByCategory();
  const [control, setControl] = useState("");

  if (isPending) {
    return <>loading...</>;
  }

  const handleSubmit = (form: Omit<setAssetByCategory, "user_id" | "date">) => {
    setAssetByCategory({ ...form, date: yearMonth });
  };

  console.log(assetsByCategory);

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

      <CategoryListHeader handleReset={deleteAssetByCategory} />
      {EXPENDITURE_CATEGORY.map((category) => {
        const categoryList = getCategoryList(category);
        return (
          <CategoryListItem
            key={category.name}
            category={category}
            categoryList={categoryList}
            totalAmount={Number(assetsByCategory?.category_total)}
            control={control}
            setControl={() => setControl(category.name)}
            closeControl={() => setControl("")}
            handleSubmit={handleSubmit}
          />
        );
      })}
    </>
  );
}

export default AssetByCategory;
