import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import useHeader from "@hooks/useHeader.ts";
import { useNavigate } from "react-router-dom";
import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import { useRegularAssetDrawer } from "@hooks/assetManagement/useRegularAssetDrawer.tsx";

function RegularAssetSetting() {
  useHeader(false);
  const navigate = useNavigate();

  const { detailSchedule, isPending, options, startDate, endDate, pickDate } =
    useRegularAsset();

  return (
    <>
      <TopNavigationBar
        onClick={() => navigate(-1)}
        title={"정기 입출금액 설정"}
      />
    </>
  );
}

export default RegularAssetSetting;
