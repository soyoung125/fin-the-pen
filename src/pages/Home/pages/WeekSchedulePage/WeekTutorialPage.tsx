import ThickDivider from "@components/common/ThickDivider.tsx";
import CalendarHeader from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader";
import WeeklyCard from "@pages/Home/pages/WeekSchedulePage/components/WeeklyCard";
import moment from "moment/moment";
import { Box } from "@mui/material";
import { init_data } from "@app/tanstack-query/home/useWeekSchedules.ts";
import { useEffect, useRef } from "react";

function WeekTutorialPage() {
  const date = moment().format("YYYY.MM.DD");
  const weekData = init_data(moment().format("YYY-MM"));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ref]);

  return (
    <>
      <Box width="100dvw">
        <Box ref={ref} />
        <ThickDivider />

        <CalendarHeader date={date} />

        {weekData &&
          weekData.week_schedule.map((schedule) => {
            const [start, end] = schedule.period.split("~");
            const isThisWeek =
              moment().isSameOrAfter(start, "day") &&
              moment().isSameOrBefore(end, "day");
            return (
              <WeeklyCard
                key={schedule.week_of_number}
                weeklyData={schedule}
                isThisWeek={isThisWeek}
              />
            );
          })}
      </Box>
    </>
  );
}

export default WeekTutorialPage;
