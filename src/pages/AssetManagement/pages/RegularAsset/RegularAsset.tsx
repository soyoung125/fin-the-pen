import useRegularAsset from "@hooks/assetManagement/RegularTemplate/useRegularAsset.ts";
import RegularAssetHeader from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader";
import moment from "moment";
import AddTemplateButton from "pages/AssetManagement/pages/RegularAsset/components/AddTemplateButton";
import { useRegularAssetDrawer } from "@hooks/assetManagement/RegularTemplate/useRegularAssetDrawer.tsx";
import RegularTemplateList from "@pages/AssetManagement/pages/RegularAsset/components/RegularTemplateList";
import useBottomBar from "@hooks/useBottomBar.ts";
import ListSwiper from "@components/TemplateDrawer/components/ListSwiper";

function RegularAsset() {
  const {
    spendSchedules,
    saveSchedules,
    isPending,
    startDate,
    endDate,
    pickDate,
    templateCount,
  } = useRegularAsset();
  const { openDeleteAssetDrawer } = useRegularAssetDrawer();

  useBottomBar(false);

  return (
    <>
      <RegularAssetHeader
        title={`${templateCount}건의 정기 템플릿을 사용중입니다.`}
        startDate={moment(startDate).format("YYYY.MM.DD")}
        endDate={moment(endDate).format("YYYY.MM.DD")}
        changeDate={pickDate}
      />
      <ListSwiper
        saveScheduleList={
          <RegularTemplateList
            schedules={saveSchedules}
            isPending={isPending}
          />
        }
        spendScheduleList={
          <RegularTemplateList
            schedules={spendSchedules}
            isPending={isPending}
          />
        }
      />
      <AddTemplateButton
        templateCount={templateCount}
        clickAction={() => alert("add")}
      />
    </>
  );
}

export default RegularAsset;
