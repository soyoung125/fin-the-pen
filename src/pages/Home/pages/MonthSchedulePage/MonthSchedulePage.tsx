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
import { Box, Collapse, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { HomePageProps } from "@pages/Home/Home.tsx";
import { TouchEvent, useEffect, useRef, useState } from "react";

function MonthSchedulePage({ updateHeight, navigateTo }: HomePageProps) {
  const { date, todaySchedules, monthData, isError, isPending, changeDate } =
    useMonthSchedule();
  const calendarRef = useRef<HTMLDivElement>(null);
  const showPredict = moment().isSameOrBefore(date, "month");
  const isThisMonth = moment().isSame(date, "month");
  const [isAtTop, setIsAtTop] = useState(true);
  const [positionY, setPositionY] = useState(-1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateHeight();
  }, [isAtTop]);

  useEffect(() => {
    setIsAtTop(true);
  }, [monthData]);

  const handleChangeDate = (newValue: moment.Moment | null) => {
    changeDate(newValue);
    setIsAtTop(false);
  };

  function handleTouchMove(event: TouchEvent) {
    if (calendarRef.current?.getBoundingClientRect().top !== 128) return;
    event.stopPropagation();
    if (positionY < 0) setPositionY(event.touches[0].clientY);
    else if (positionY - event.touches[0].clientY < -30 && !isAtTop) {
      setIsAtTop(true);
    }
  }

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
    <Box onTouchMove={handleTouchMove} onTouchEnd={() => setPositionY(-1)}>
      <Collapse in={isAtTop}>
        <MonthlyBudgetSummary
          income={parseInt(monthData?.income ?? "")}
          expenditure={parseInt(monthData?.expense ?? "")}
          availableAmount={parseInt(monthData?.available ?? "")}
          showPredict={showPredict}
          dayTitle={isThisMonth ? "이번달" : moment(date).format("M월")}
        />

        <ThickDivider />
      </Collapse>

      <div ref={calendarRef}>
        <CalendarHeader
          date={date}
          count={todaySchedules.length}
          handleClick={navigateTo}
          isToday={moment().isSame(date, "date")}
        />
        <Calendar value={date} handleChange={handleChangeDate} />
      </div>

      <ThickDivider />

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
    </Box>
  );
}

export default MonthSchedulePage;
