import { Dispatch, SetStateAction } from "react";
import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import ThickDivider from "@components/common/ThickDivider.tsx";
import RepeatInput from "../RepeatInput.tsx";
import { Box, Button } from "@mui/material";
import RepeatContainer from "./containers/RepeatContainer/RepeatContainer.tsx";
import PeriodContainer from "./containers/PeriodContainer/PeriodContainer.tsx";
import { useCategoryPicker } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/useCategoryPicker.ts";
import { ActionContainer } from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker/CategoryPicker.style.ts";

export interface RepeatPickerProps {
  setIsRepeatPickerOpen: Dispatch<SetStateAction<boolean>>;
}

function RepeatPicker({ setIsRepeatPickerOpen }: RepeatPickerProps) {
  const {
    repeat,
    repeatType,
    period,
    periodType,
    updateRepeat,
    updatePeriod,
    getRepeat,
    handleRepeatChange,
    handlePeriodChange,
    updateYearRepeat,
    saveRepeat,
  } = useCategoryPicker();

  const handleSave = () => {
    saveRepeat();
    setIsRepeatPickerOpen(false);
  };

  return (
    <Box>
      <TopNavigationBar
        onClick={() => setIsRepeatPickerOpen(false)}
        title="반복 설정"
      />

      <RepeatInput
        repeatType={repeatType}
        handleChange={handleRepeatChange}
        repeatTitle={getRepeat()}
      />

      {repeatType !== "none" && (
        <Box mb="80px">
          <RepeatContainer
            repeatType={repeatType}
            repeat={repeat}
            handleChange={handleRepeatChange}
            handleChangeOption={updateRepeat}
            updateYearRepeat={updateYearRepeat}
          />

          <ThickDivider />

          <Box sx={{ color: "primary.main" }} px={2} py={2}>
            기간
          </Box>
          <PeriodContainer
            periodType={periodType}
            handleChange={handlePeriodChange}
            period={period}
            handleChangeOption={updatePeriod}
          />
        </Box>
      )}

      <ActionContainer>
        <Button fullWidth variant="contained" onClick={handleSave}>
          저장하기
        </Button>
      </ActionContainer>
    </Box>
  );
}

export default RepeatPicker;
