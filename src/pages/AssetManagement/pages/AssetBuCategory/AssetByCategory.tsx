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
import { IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
  const { openToast, closeToast } = useToast();
  console.log(assetsByCategory);

  const [control, setControl] = useState("");

  if (isPending) {
    return <>loading...</>;
  }

  const handleSubmit = (form: Omit<setAssetByCategory, "user_id" | "date">) => {
    setAssetByCategory({ ...form, date: yearMonth });
  };

  const compareTotal = (prev: number, curr: number) => {
    const totalAmount = Number(assetsByCategory?.spend_goal_amount);
    const totalSummary =
      assetsByCategory?.category_list.reduce((result, curr) => {
        return result + Number(curr.category_total);
      }, 0) ?? 0;
    console.log(totalSummary - prev + curr, totalAmount);

    if (totalSummary - prev + curr > totalAmount) {
      openToast({
        hideDuration: 5000,
        toastElement: (
          <Typography flexGrow={1}>지출 목표 금액을 초과했습니다.</Typography>
        ),
        color: "primary.main",
        actionsElement: (
          <IconButton aria-label="delete" size="small" onClick={closeToast}>
            <CloseRoundedIcon sx={{ color: "#FFF" }} />
          </IconButton>
        ),
      });
    }
  };

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
            control={control}
            setControl={setControl}
            closeControl={() => setControl("")}
            handleSubmit={handleSubmit}
            compareTotal={compareTotal}
          />
        );
      })}
    </>
  );
}

export default AssetByCategory;
