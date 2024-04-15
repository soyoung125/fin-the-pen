import useAssetByCategory from "@hooks/assetManagement/useAssetByCategory.ts";
import SelectMonth from "@pages/AssetManagement/pages/AssetBuCategory/components/SelectMonth";
import SummaryCard from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard";
import moment from "moment";

function AssetByCategory() {
  const { yearMonth, assetsByCategory, pickMonth } = useAssetByCategory();

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
    </>
  );
}

export default AssetByCategory;
