import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useNavigate } from "react-router-dom";
import useHeader from "@hooks/useHeader.ts";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import RegularScheduleList from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList";
import moment from "moment/moment";
import RegularAssetHeader from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader";
import { Typography } from "@mui/material";
import { useRegularAssetDrawer } from "@hooks/assetManagement/useRegularAssetDrawer.tsx";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import RegularScheduleHeader from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleHeader";
import useBottomBar from "@hooks/useBottomBar.ts";

function RegularAssetDetail() {
  useHeader(false);
  useBottomBar(false);
  const navigate = useNavigate();
  const {
    eventName,
    detailSchedules,
    detailSchedule,
    isPending,
    options,
    startDate,
    endDate,
    pickDate,
  } = useRegularAsset();
  const { openRegularAssetDrawer } = useRegularAssetDrawer();

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title={"정기 템플릿 상세"}
      />

      <RegularScheduleHeader
        eventName={eventName ?? ""}
        category={detailSchedules[0].category}
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

      <RegularScheduleList
        options={options}
        isPending={isPending}
        schedules={detailSchedules}
      />
    </>
  );
}

export default RegularAssetDetail;
