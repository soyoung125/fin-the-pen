import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useNavigate } from "react-router-dom";
import useHeader from "@hooks/useHeader.ts";
import RegularScheduleList from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList";
import RegularScheduleHeader from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader";
import useBottomBar from "@hooks/useBottomBar.ts";
import ScheduleListHeader from "@components/ScheduleList/ScheduleListHeader";
import React from "react";
import useRegularAssetInfo from "@hooks/assetManagement/RegularTemplate/useRegularAssetInfo.ts";
import { useRegularAssetDrawer } from "@hooks/assetManagement/RegularTemplate/useRegularAssetDrawer.tsx";

function RegularAssetDetail() {
  useHeader(false);
  useBottomBar(false);
  const navigate = useNavigate();
  const {
    template,
    detailSchedules,
    isPending,
    options,
    selectedOption,
    startDate,
    endDate,
    pickDate,
    handleChangeOption,
  } = useRegularAssetInfo();
  const { openModifyTemplateDrawer } = useRegularAssetDrawer();

  if (!template) {
    return (
      <>
        <TopNavigationBar
          onClick={() => navigate(-1)}
          title={"정기 템플릿 상세"}
        />
        <>잘못된 접근입니다.</>
      </>
    );
  }

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title={"정기 템플릿 상세"}
      />

      <RegularScheduleHeader
        eventName={template.template_name}
        category={template.category_name}
        startDate={startDate}
        endDate={endDate}
        changeDate={pickDate}
        amount={100000}
        clickModify={() => openModifyTemplateDrawer(template)}
      />

      {/*<RegularAssetHeader*/}
      {/*  title={eventName ?? ""}*/}
      {/*  startDate={moment(startDate).format("YYYY.MM.DD")}*/}
      {/*  endDate={moment(endDate).format("YYYY.MM.DD")}*/}
      {/*  changeDate={pickDate}*/}
      {/*  clickDetail={*/}
      {/*    <Typography*/}
      {/*      fontSize="13px"*/}
      {/*      color="#8C919C"*/}
      {/*      onClick={() =>*/}
      {/*        openRegularAssetDrawer(*/}
      {/*          SCHEDULE_REQUEST(detailSchedule),*/}
      {/*          eventName ?? ""*/}
      {/*        )*/}
      {/*      }*/}
      {/*    >*/}
      {/*      자세히*/}
      {/*    </Typography>*/}
      {/*  }*/}
      {/*/>*/}

      <ScheduleListHeader
        count={detailSchedules.length}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={handleChangeOption}
      />

      <RegularScheduleList isPending={isPending} schedules={detailSchedules} />
    </>
  );
}

export default RegularAssetDetail;
