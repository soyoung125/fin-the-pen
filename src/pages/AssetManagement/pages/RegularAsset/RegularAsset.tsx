import useRegularAsset from "@hooks/assetManagement/useRegularAsset.ts";
import RegularAssetHeader from "@pages/AssetManagement/pages/RegularAsset/components/RegularAssetHeader";
import moment from "moment";
import { SyntheticEvent, useState } from "react";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import MonthSchedulePage from "@pages/Home/pages/MonthSchedulePage/MonthSchedulePage.tsx";
import WeekSchedulePage from "@pages/Home/pages/WeekSchedulePage/WeekSchedulePage.tsx";
import DaySchedulePage from "@pages/Home/pages/DaySchedulePage/DaySchedulePage.tsx";
import RegularScheduleList from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleList";

function RegularAsset() {
  const {
    spendSchedules,
    saveSchedules,
    isPending,
    startDate,
    endDate,
    pickDate,
  } = useRegularAsset();
  const labels = ["입금", "출금"];
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <RegularAssetHeader
        title={"정기 입출금"}
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
          <RegularScheduleList
            schedules={saveSchedules}
            isPending={isPending}
          />
        </SwiperSlide>
        <SwiperSlide>
          <RegularScheduleList
            schedules={spendSchedules}
            isPending={isPending}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default RegularAsset;
