import { Dispatch, SetStateAction } from "react";
import TopNavigationBar from "@components/layouts/common/TopNavigationBar";
import ThickDivider from "@components/common/ThickDivider.tsx";
import RepeatInput from "../RepeatInput.tsx";
import { Box } from "@mui/material";
import { useScheduleForm } from "../../../../hooks/useScheduleForm.ts";
import RepeatContainer from "./containers/RepeatContainer/RepeatContainer.tsx";
import PeriodContainer from "./containers/PeriodContainer/PeriodContainer.tsx";

export interface RepeatPickerProps {
  setIsRepeatPickerOpen: Dispatch<SetStateAction<boolean>>;
}

function RepeatPicker({ setIsRepeatPickerOpen }: RepeatPickerProps) {
  const { updateRepeat, updatePeriod, scheduleForm } = useScheduleForm();

  const repeatType = scheduleForm?.repeat.kind_type ?? "day";
  const periodType = scheduleForm?.period.kind_type ?? "is_repeat_again";

  const handleRepeatChange = (v: string) => {
    updateRepeat({ target: { id: "repeat", value: v } });
  };

  const handlePeriodChange = (v: string) => {
    updatePeriod({ target: { id: "period", value: v } });
  };

  return (
    <Box minHeight="634.5px">
      <TopNavigationBar
        onClick={() => setIsRepeatPickerOpen(false)}
        title="반복 설정"
      />

      <RepeatInput repeatType={repeatType} handleChange={handleRepeatChange} />

      {repeatType !== "none" && (
        <>
          <RepeatContainer
            repeatType={repeatType}
            handleChange={handleRepeatChange}
          />

          <ThickDivider />

          <Box sx={{ color: "primary.main" }} px={2} py={2}>
            기간
          </Box>
          <PeriodContainer
            periodType={periodType}
            handleChange={handlePeriodChange}
          />
        </>
      )}
    </Box>
  );
}

export default RepeatPicker;
