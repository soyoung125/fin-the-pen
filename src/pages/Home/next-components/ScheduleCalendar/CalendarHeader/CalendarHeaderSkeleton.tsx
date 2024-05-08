import { Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment/moment";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

export interface CalendarHeaderSkeleton {
  date: string;
}

function CalendarHeaderSkeleton({ date }: CalendarHeaderSkeleton) {
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
          {/*{moment(date).format("M월 D일 dddd")}*/}
          111
        </Typography>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Skeleton width="50px" />
        </Typography>
      </Stack>
      <FormatListBulletedRoundedIcon color={"primary"} />
    </Stack>
  );
}

export default CalendarHeaderSkeleton;
