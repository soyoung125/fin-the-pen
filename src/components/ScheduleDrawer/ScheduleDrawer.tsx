import { Alert, Box, Slide, SlideProps, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import AssetFormPage from "./pages/AssetFormPage";
import ScheduleDrawerHeader from "./layouts/ScheduleDrawerHeader.tsx";
import ScheduleDrawerFooter from "./layouts/ScheduleDrawerFooter/ScheduleDrawerFooter.tsx";
import { CONSUMPTION_ALERTS } from "@constants/alerts.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ScheduleFormPage from "./pages/ScheduleFormPage";
import CategoryPicker from "./pages/ScheduleFormPage/components/CategoryPicker";
import RepeatPicker from "./pages/ScheduleFormPage/components/RepeatPicker";
import useSchedule from "@hooks/useSchedule.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

function TransitionUp(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

interface ScheduleDrawerProps {
  handleClose: () => void;
}

function ScheduleDrawer({ handleClose }: ScheduleDrawerProps) {
  // 추후 삭제 예정
  const random = Math.floor(Math.random() * 4); // 현재 CONSUMPTION_ALERTS의 길이가 4임

  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [showError, setShowError] = useState(false);
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [isRepeatPickerOpen, setIsRepeatPickerOpen] = useState(false);

  const { resetSchedule } = useSchedule();
  const { openConfirm } = useDialog();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  const handleReset = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "입력 정보를 초기화하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      setShowError(false);
      resetSchedule();
    }
  };

  if (isCategoryPickerOpen) {
    return <CategoryPicker setIsCategoryPickerOpen={setIsCategoryPickerOpen} />;
  }
  if (isRepeatPickerOpen) {
    return <RepeatPicker setIsRepeatPickerOpen={setIsRepeatPickerOpen} />;
  }

  return (
    <div>
      <Box sx={{ height: "100%", pt: 1, mb: 3 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={5000}
          open={snackbarOpen}
          onClose={() => {
            setSnackbarOpen(false);
          }}
          TransitionComponent={TransitionUp}
        >
          <Alert
            color={CONSUMPTION_ALERTS[random].color}
            sx={{ width: "100%" }}
            icon={CONSUMPTION_ALERTS[random].icon}
          >
            {CONSUMPTION_ALERTS[random].message}
          </Alert>
        </Snackbar>

        <ScheduleDrawerHeader
          value={value}
          handleChange={handleChange}
          handleReset={handleReset}
        />

        <Stack
          justifyContent="space-between"
          spacing={2}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Swiper
            className="mySwiper"
            spaceBetween={50}
            onSlideChange={(e) => setValue(e.activeIndex)}
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            <SwiperSlide style={{ overflow: "scroll" }}>
              <ScheduleFormPage
                showError={showError}
                setIsCategoryPickerOpen={setIsCategoryPickerOpen}
                setIsRepeatPickerOpen={setIsRepeatPickerOpen}
              />
            </SwiperSlide>
            <SwiperSlide>
              <AssetFormPage />
            </SwiperSlide>
          </Swiper>

          {/* 제출 버튼 */}
          <ScheduleDrawerFooter
            handleClose={handleClose}
            setShowError={setShowError}
          />
        </Stack>
      </Box>
    </div>
  );
}

export default ScheduleDrawer;
