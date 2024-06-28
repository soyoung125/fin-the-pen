import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useNavigate } from "react-router-dom";
import useHeader from "@hooks/useHeader.ts";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import RegularScheduleList from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList";
import RegularScheduleHeader from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader";
import useBottomBar from "@hooks/useBottomBar.ts";
import ScheduleListHeader from "@components/ScheduleList/ScheduleListHeader";
import React, { useState } from "react";

function RegularAssetDetail() {
  useHeader(false);
  useBottomBar(false);
  const navigate = useNavigate();
  const {
    eventName,
    category,
    detailSchedules,
    isPending,
    options,
    startDate,
    endDate,
    pickDate,
  } = useRegularAsset();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title={"정기 템플릿 상세"}
      />

      <RegularScheduleHeader
        eventName={eventName ?? ""}
        category={category ?? ""}
        startDate={startDate}
        endDate={endDate}
        changeDate={pickDate}
        amount={100000}
        clickModify={() => alert("modify")}
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
        setSelectedOption={setSelectedOption}
      />

      <RegularScheduleList isPending={isPending} schedules={detailSchedules} />
    </>
  );
}

export default RegularAssetDetail;
