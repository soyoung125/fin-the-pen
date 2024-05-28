import { Box, Stack } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import AssetFormPage from "./pages/AssetFormPage";
import ScheduleDrawerHeader from "./layouts/ScheduleDrawerHeader.tsx";
import ScheduleDrawerFooter from "./layouts/ScheduleDrawerFooter/ScheduleDrawerFooter.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import ScheduleFormPage from "./pages/ScheduleFormPage";
import CategoryPicker from "./pages/ScheduleFormPage/components/CategoryPicker";
import RepeatPicker from "./pages/ScheduleFormPage/components/RepeatPicker";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { Puller } from "@components/ScheduleDrawer/ScheduleDrawer.styles.ts";

interface ScheduleDrawerProps {
  handleClose: () => void;
  resetSchedule: () => void;
}

function ScheduleDrawer({ handleClose, resetSchedule }: ScheduleDrawerProps) {
  const [showError, setShowError] = useState(false);
  const [value, setValue] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
  const [isRepeatPickerOpen, setIsRepeatPickerOpen] = useState(false);

  const { openConfirm } = useDialog();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    swiper?.slideTo(newValue);
    setValue(newValue);
  };

  const handleReset = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "모든 정보를 초기화하시겠습니까?",
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
      <Box
        sx={{
          height: "100%",
          pt: 1,
          mb: 3,
        }}
      >
        <Puller />
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
