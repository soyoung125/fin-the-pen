import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import RegularAssetHeader from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader";
import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import AddTemplateButton from "pages/AssetManagement/pages/RegularAsset/components/AddTemplateButton";
import { useRegularAssetDrawer } from "@hooks/assetManagement/useRegularAssetDrawer.tsx";
import RegularTemplateList from "@pages/AssetManagement/pages/RegularAsset/components/RegularTemplateList";
import TopNavigation from "@pages/AssetManagement/pages/RegularAsset/components/TopNavigation";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import useBottomBar from "@hooks/useBottomBar.ts";

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
  const labels = ["입금", "출금"];
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  useHeader(false);
  useBottomBar(false);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  return (
    <>
      <TopNavigation />
      <RegularAssetHeader
        title={`${templateCount}건의 정기 템플릿을 사용중입니다.`}
        startDate={moment(startDate).format("YYYY.MM.DD")}
        endDate={moment(endDate).format("YYYY.MM.DD")}
        changeDate={pickDate}
      />
      <MenuTab labels={labels} value={value} handleChange={handleChangeTab} />
      <Swiper
        className="mySwiper"
        spaceBetween={50}
        autoHeight={true}
        onSlideChange={(e) => setValue(e.activeIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>
          <RegularTemplateList
            schedules={saveSchedules}
            isPending={isPending}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RegularTemplateList
            schedules={spendSchedules}
            isPending={isPending}
          />
        </SwiperSlide>
      </Swiper>
      <AddTemplateButton
        templateCount={templateCount}
        clickAction={openDeleteAssetDrawer}
      />
    </>
  );
}

export default RegularAsset;
