import { Stack, Typography } from "@mui/material";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import moment from "moment";
import TodayBadge from "@components/common/TodayBadge";

export interface CalendarHeaderProps {
  date: string;
  count?: number;
  handleClick?: () => void;
  isToday?: boolean;
}

function CalendarHeader({
  date,
  count,
  handleClick,
  isToday,
}: CalendarHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={2.5}
      pt={3}
      pb={1}
    >
      <Stack direction={"row"} alignItems="center" spacing="5px">
        <Typography variant="h1">
          {moment(date).format("M월 D일 dddd")}
        </Typography>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {count !== undefined && `총 ${count}건`}
        </Typography>
        {isToday && <TodayBadge />}
      </Stack>
      <FormatListBulletedRoundedIcon onClick={handleClick} color={"primary"} />
    </Stack>
  );
}

export default CalendarHeader;
