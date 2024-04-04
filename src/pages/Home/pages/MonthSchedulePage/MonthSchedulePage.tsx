import MonthlyBudgetSummary from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CalendarHeader from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader";
import Calendar from "pages/Home/pages/MonthSchedulePage/components/Calendar";
import moment from "moment/moment";
import ScheduleList from "@components/ScheduleList";
import useMonthSchedule from "@hooks/home/useMonthSchedule.ts";
import MonthlyBudgetSummarySkeleton from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary/MonthlyBudgetSummarySkeleton.tsx";
import CalendarHeaderSkeleton from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader/CalendarHeaderSkeleton.tsx";
import ScheduleListSkeleton from "@components/ScheduleList/ScheduleListSkeleton.tsx";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { HomePageProps } from "@pages/Home/Home.tsx";
import { useEffect, useRef } from "react";

function MonthSchedulePage({ updateHeight, navigateTo }: HomePageProps) {
  const { date, todaySchedules, monthData, isError, isPending, changeDate } =
    useMonthSchedule();
  const calendarRef = useRef<HTMLDivElement>(null);
  const scheduleListRef = useRef<HTMLDivElement>(null);
  const showPredict = moment().isSameOrBefore(date, "month");
  const isThisMonth = moment().isSame(date, "month");
  const height =
    276 +
    (calendarRef.current?.offsetHeight || 0) +
    (scheduleListRef.current?.offsetHeight || 0);

  console.log(window.innerHeight - height);
  useEffect(() => {
    updateHeight();
  }, [monthData]);

  const handleChangeDate = (newValue: moment.Moment | null) => {
    scrollToTop();
    changeDate(newValue);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 173,
      behavior: "smooth",
    });
  };

  if (isPending) {
    return (
      <Box>
        <MonthlyBudgetSummarySkeleton
          showPredict={showPredict}
          dayTitle={isThisMonth ? "이번달" : moment(date).format("M월")}
        />
        <ThickDivider />
        <CalendarHeaderSkeleton date={date} />
        <Calendar value={date} handleChange={handleChangeDate} />
        <ThickDivider />
        <ScheduleListSkeleton />
      </Box>
    );
  }

  return (
    <Box
      pb={
        window.innerHeight - height > 0
          ? `${window.innerHeight - height}px`
          : "0px"
      }
    >
      <MonthlyBudgetSummary
        income={parseInt(monthData?.income ?? "")}
        expenditure={parseInt(monthData?.expense ?? "")}
        availableAmount={parseInt(monthData?.available ?? "")}
        showPredict={showPredict}
        dayTitle={isThisMonth ? "이번달" : moment(date).format("M월")}
      />

      <ThickDivider />

      <CalendarHeader
        date={date}
        count={todaySchedules.length}
        handleClick={navigateTo}
        isToday={moment().isSame(date, "date")}
      />

      <div ref={calendarRef}>
        <Calendar value={date} handleChange={handleChangeDate} />
      </div>

      <ThickDivider />

      <div ref={scheduleListRef}>
        <ScheduleList
          date={date}
          todaySchedules={todaySchedules.slice(0, 3)}
          isError={isError}
          isPending={isPending}
        />

        {todaySchedules.length > 3 && (
          <Stack
            p={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
            onClick={navigateTo}
          >
            <Typography>
              <span style={{ color: "#735BF2", fontWeight: 700 }}>
                {todaySchedules.length - 3}건
              </span>
              &nbsp;일정 더보기
            </Typography>
            <KeyboardArrowRightIcon sx={{ color: "#8C919C" }} />
          </Stack>
        )}
      </div>
    </Box>
  );
}

export default MonthSchedulePage;
