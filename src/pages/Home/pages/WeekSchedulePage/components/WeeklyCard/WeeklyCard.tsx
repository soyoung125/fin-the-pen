import { Box, Grid, Stack, Typography } from "@mui/material";
import { WeeklySchedule } from "@app/types/schedule.ts";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import TodayBadge from "@components/common/TodayBadge";
import WeeklyAmountCard from "@pages/Home/pages/WeekSchedulePage/components/WeeklyAmountCard";
import moment from "moment";

export interface WeeklyCardProps {
  weeklyData: WeeklySchedule;
  isThisWeek: boolean;
  navigateTo?: () => void;
}

function WeeklyCard({ weeklyData, isThisWeek, navigateTo }: WeeklyCardProps) {
  const [start, end] = weeklyData.period.split("~");
  const pattern = "M/D";
  return (
    <Box p={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={1}
        height={"24px"}
      >
        <Typography variant="h2" color="primary.main">
          {weeklyData.week_of_number}
        </Typography>
        <Typography color="#5B5F67">{`${moment(start).format(
          pattern
        )} - ${moment(end).format(pattern)}`}</Typography>
        {isThisWeek && <TodayBadge isWeek />}
        {navigateTo && (
          <Box sx={{ flexGrow: 1, textAlign: "right" }} onClick={navigateTo}>
            <FormatListBulletedRoundedIcon color={"primary"} />
          </Box>
        )}
      </Stack>

      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <WeeklyAmountCard isIncome={true} amount={weeklyData.plus} />
        </Grid>
        <Grid item xs={6}>
          <WeeklyAmountCard isIncome={false} amount={weeklyData.minus} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default WeeklyCard;
