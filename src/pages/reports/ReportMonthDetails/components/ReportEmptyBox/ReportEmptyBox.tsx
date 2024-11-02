import { Stack, Typography, Button } from "@mui/material";
import warning_icon from "@assets/icons/warning.svg";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";

export interface ReportEmptyBoxProps {
  handleClickAddSchedule: () => void;
}

function ReportEmptyBox({ handleClickAddSchedule }: ReportEmptyBoxProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <img src={warning_icon} alt="warning" />
      <Typography fontSize="16px">소비 데이터가 없습니다.</Typography>
      <Button variant="contained" onClick={handleClickAddSchedule}>
        {SCHEDULE_DRAWER.add_schedule}
      </Button>
    </Stack>
  );
}

export default ReportEmptyBox;
