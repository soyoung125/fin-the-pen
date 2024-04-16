import { Stack, Typography } from "@mui/material";
import calendar_outlined from "@assets/icons/calendar_outlined.svg";

export interface SelectMonthProps {
  date: string;
  handleClick: () => void;
}

function SelectMonth({ date, handleClick }: SelectMonthProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      px={2}
      onClick={handleClick}
      height={48}
      alignItems="center"
    >
      <img src={calendar_outlined} alt={"calendar outlined"} />
      <Typography variant="h2">{date}</Typography>
    </Stack>
  );
}

export default SelectMonth;
