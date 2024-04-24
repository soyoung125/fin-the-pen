import { Box, Stack, Typography } from "@mui/material";
import { Schedule } from "@app/types/schedule.ts";
import ScheduleCard from "components/ScheduleList/ScheduleCard";
import { useAppSelector } from "@redux/hooks.ts";
import { selectIsBudgetHidden } from "@redux/slices/settingSlice.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import ScheduleDateBox from "components/ScheduleList/ScheduleDateBox";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import ScheduleDateBoxSkeleton from "@components/ScheduleList/ScheduleDateBox/ScheduleDateBoxSkeleton.tsx";
import moment from "moment";

interface ScheduleListProps {
  showHeader?: boolean;
  date: string;
  todaySchedules: Schedule[];
  isPending: boolean;
  isError: boolean;
  count?: number;
}

function ScheduleList({
  showHeader,
  date,
  todaySchedules,
  isPending,
  isError,
  count,
}: ScheduleListProps) {
  const isHideBudgetMode = useAppSelector(selectIsBudgetHidden);
  const { openScheduleDrawer } = useScheduleDrawer();

  if (isPending) {
    return (
      <>
        {showHeader && <ScheduleDateBoxSkeleton count={0} date={date} />}
        {Array.from({ length: 6 }, () => 0).map((num) => (
          <ScheduleCardSkeleton key={num} />
        ))}
      </>
    );
  }

  if (showHeader && todaySchedules.length === 0) {
    return (
      <>
        <ScheduleDateBoxSkeleton count={0} date={date} />
        {Array.from({ length: 2 }, () => 0).map((num) => (
          <ScheduleCardSkeleton key={num} />
        ))}
      </>
    );
  }

  if (todaySchedules.length === 0 || isError) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Box my={5}>
          <Typography>{date}에 등록된 일정이 없습니다!</Typography>
        </Box>
      </Stack>
    );
  }

  const handleModal = (schedule: Schedule) => {
    if (schedule && !isHideBudgetMode) {
      openScheduleDrawer(SCHEDULE_REQUEST(schedule));
    }
  };

  return (
    <>
      {showHeader && <ScheduleDateBox count={count} date={date} />}
      {todaySchedules.map((s, index) => (
        <ScheduleCard
          key={index}
          title={`${s.start_time}-${s.end_time}`}
          category={s.category}
          priceType={s.price_type}
          eventName={s.event_name}
          amount={Number(s.amount)}
          isPredict={moment().isBefore(s.end_date, "day")}
          isRepeat={s.repeat_kind !== "NONE"}
          onClick={() => handleModal(s)}
          icon
        />
      ))}
    </>
  );
}

export default ScheduleList;
