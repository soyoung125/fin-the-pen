import { Stack, Typography, Button } from "@mui/material";
import warning_icon from "@assets/icons/warning.svg";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";

export interface ReportEmptyBoxProps {
  handleClickAddSchedule: () => void;
  mode: "schedule" | "spendGoal";
}

function ReportEmptyBox({ mode, handleClickAddSchedule }: ReportEmptyBoxProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <img src={warning_icon} alt="warning" />
      <Typography fontSize="16px">
        {mode === "schedule"
          ? "소비 데이터가 없습니다."
          : "카체고리별 지출 목표가 미설정되었습니다."}
      </Typography>
      <Button variant="contained" onClick={handleClickAddSchedule}>
        {mode === "schedule"
          ? SCHEDULE_DRAWER.add_schedule
          : "카테고리별 지출 목표 설정하기"}
      </Button>
    </Stack>
  );
}

export default ReportEmptyBox;
