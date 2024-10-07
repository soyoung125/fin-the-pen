import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Portal } from "@mui/material";
import {
  setBottomBarOpenTrue,
  setIsAuthenticatedFalse,
} from "@redux/slices/commonSlice.tsx";
import useHeader from "@hooks/useHeader.ts";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import { selectIsBudgetHidden } from "@redux/slices/settingSlice.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import SelectYearMonth from "@components/common/SelectYearMonth";
import moment from "moment";
import MenuTab from "@pages/Home/next-components/HomeHeader/MenuTab";
import useHome from "@hooks/useHome.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import WeekSchedulePage from "@pages/Home/pages/WeekSchedulePage/WeekSchedulePage.tsx";
import MonthSchedulePage from "@pages/Home/pages/MonthSchedulePage/MonthSchedulePage.tsx";
import DaySchedulePage from "@pages/Home/pages/DaySchedulePage/DaySchedulePage.tsx";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import MoveToday from "@pages/Home/next-components/MoveToday";
import { useOnBoarding } from "@hooks/onboarding/useOnBoarding.tsx";

export interface HomePageProps {
  updateHeight: () => void;
  navigateTo: () => void;
}

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onboarding, mainTutorial, openOnBoarding, openMainTutorial } =
    useOnBoarding();
  const isHideBudgetMode = useAppSelector(selectIsBudgetHidden);
  const {
    date,
    subtractMonth,
    addMonth,
    pickMonth,
    addDay,
    subtractDay,
    pickDay,
    changeToToday,
  } = useHome();
  const labels = ["월 별", "주 별", "일 별"];
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();

  useEffect(() => {
    dispatch(setBottomBarOpenTrue());
    if (isHideBudgetMode) {
      dispatch(setIsAuthenticatedFalse());
    }

    if (!onboarding) {
      openOnBoarding().then(() => {
        if (!mainTutorial) {
          openMainTutorial();
        }
      });
      return;
    }

    if (!mainTutorial) {
      openMainTutorial();
    }
  }, []);

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  const updateHeight = () => {
    setTimeout(() => swiper?.updateAutoHeight(10), 100);
  };

  const handleNavigate = () => navigate(PATH.scheduleList);

  useHeader(true, HEADER_MODE.home);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 40,
          zIndex: 100,
          backgroundColor: "#FFF",
        }}
      >
        <Box py={1} px={2.5}>
          {value === 2 ? (
            <SelectYearMonth
              date={moment(date).format("YYYY년 M월 D일")}
              lastMonth={subtractDay}
              nextMonth={addDay}
              changeYearAndMonth={pickDay}
            />
          ) : (
            <SelectYearMonth
              date={moment(date).format("YYYY년 M월")}
              lastMonth={subtractMonth}
              nextMonth={addMonth}
              changeYearAndMonth={pickMonth}
            />
          )}
        </Box>
        <MenuTab labels={labels} value={value} handleChange={handleChangeTab} />
      </Box>

      <Swiper
        className="mySwiper"
        spaceBetween={50}
        autoHeight={true}
        onSlideChange={(e) => setValue(e.activeIndex)}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>
          <MonthSchedulePage
            updateHeight={updateHeight}
            navigateTo={handleNavigate}
          />
        </SwiperSlide>
        <SwiperSlide>
          <WeekSchedulePage
            updateHeight={updateHeight}
            navigateTo={handleNavigate}
          />
        </SwiperSlide>
        <SwiperSlide>
          <DaySchedulePage
            updateHeight={updateHeight}
            navigateTo={handleNavigate}
          />
        </SwiperSlide>
      </Swiper>

      <MoveToday date={date} value={value} changeToToday={changeToToday} />
    </>
  );
}

export default Home;
