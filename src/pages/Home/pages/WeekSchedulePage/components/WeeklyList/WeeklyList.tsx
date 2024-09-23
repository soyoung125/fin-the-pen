import moment from "moment";
import { WeekSchedule } from "@app/types/schedule.ts";
import { init_data } from "@app/tanstack-query/home/useWeekSchedules.ts";
import WeeklyCard from "@pages/Home/pages/WeekSchedulePage/components/WeeklyCard";

interface WeeklyListProps {
  isThisMonth: boolean;
  isError: boolean;
  date: string;
  navigateTo: () => void;
  weekData?: WeekSchedule;
}

function WeeklyList({
  isThisMonth,
  isError,
  date,
  navigateTo,
  weekData,
}: WeeklyListProps) {
  const data = !weekData || isError ? init_data(date) : weekData;

  return data.week_schedule.map((schedule) => {
    const [start, end] = schedule.period.split("~");
    const isThisWeek =
      moment().isSameOrAfter(start, "day") &&
      moment().isSameOrBefore(end, "day");
    return (
      <WeeklyCard
        key={schedule.week_of_number}
        weeklyData={schedule}
        isThisWeek={isThisWeek}
        navigateTo={
          !isThisMonth && schedule.week_of_number === "1주차"
            ? navigateTo
            : undefined
        }
      />
    );
  });
}

export default WeeklyList;
