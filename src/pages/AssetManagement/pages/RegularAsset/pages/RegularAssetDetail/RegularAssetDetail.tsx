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

function RegularAssetDetail() {
  useHeader(false);
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
        title={"정기 입출금액 설정"}
      />

      <RegularAssetHeader
        title={eventName ?? ""}
        startDate={moment(startDate).format("YYYY.MM.DD")}
        endDate={moment(endDate).format("YYYY.MM.DD")}
        changeDate={pickDate}
        clickDetail={
          <Typography
            fontSize="13px"
            color="#8C919C"
            onClick={() =>
              openRegularAssetDrawer(
                SCHEDULE_REQUEST(detailSchedule),
                eventName ?? ""
              )
            }
          >
            자세히
          </Typography>
        }
      />

      <RegularScheduleList
        options={options}
        isPending={isPending}
        schedules={detailSchedules}
      />
    </>
  );
}

export default RegularAssetDetail;
