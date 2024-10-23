import { Swiper, SwiperSlide } from "swiper/react";
import { ReactNode, SyntheticEvent, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import { Box } from "@mui/material";

export interface ListSwiperProps {
  spendScheduleList: ReactNode;
  saveScheduleList: ReactNode;
}

function ListSwiper({ spendScheduleList, saveScheduleList }: ListSwiperProps) {
  const labels = ["입금", "출금"];

  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  return (
    <Box width="100d%">
      <MenuTab labels={labels} value={value} handleChange={handleChangeTab} />
      <Swiper
        className="mySwiper"
        spaceBetween={50}
        autoHeight={true}
        onSlideChange={(e) => setValue(e.activeIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>{saveScheduleList}</SwiperSlide>
        <SwiperSlide>{spendScheduleList}</SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default ListSwiper;
