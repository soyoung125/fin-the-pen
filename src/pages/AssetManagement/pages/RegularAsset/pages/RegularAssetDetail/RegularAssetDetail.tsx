import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import useHeader from "@hooks/useHeader.ts";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import RegularScheduleList from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList";
import moment from "moment/moment";
import RegularAssetHeader from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader";

function RegularAssetDetail() {
  useHeader(false);
  const navigate = useNavigate();
  const {
    eventName,
    detailSchedules,
    isPending,
    options,
    startDate,
    endDate,
    pickDate,
  } = useRegularAsset();

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
