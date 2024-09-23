import MonthlyBudgetSummary from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CalendarHeader from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader";
import useWeekSchedule from "@hooks/home/useWeekSchedule.ts";
import moment from "moment/moment";
import MonthlyBudgetSummarySkeleton from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary/MonthlyBudgetSummarySkeleton.tsx";
import WeeklyCardSkeleton from "@pages/Home/pages/WeekSchedulePage/components/WeeklyCard/WeeklyCardSkeleton.tsx";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { HomePageProps } from "@pages/Home/Home.tsx";
import WeeklyList from "@pages/Home/pages/WeekSchedulePage/components/WeeklyList";

function WeekSchedulePage({ updateHeight, navigateTo }: HomePageProps) {
  const { date, month, weekData, isPending, isError } = useWeekSchedule();
  const weeks = Array.from({ length: 6 }, (_, i) => (i + 1).toString());
  const isThisMonth = moment().isSame(date, "month");
  const showPredict = moment().isSameOrBefore(date, "month");

  useEffect(() => {
    updateHeight();
  }, [weekData]);

  if (isPending) {
    return (
      <Box>
        <MonthlyBudgetSummarySkeleton
          showPredict={showPredict}
          dayTitle={isThisMonth ? "이번달" : moment(date).format("M월")}
        />
        <ThickDivider />
        {weeks.map((w) => (
          <WeeklyCardSkeleton key={w} week={w} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <MonthlyBudgetSummary
        income={parseInt(weekData?.income ?? "")}
        expenditure={parseInt(weekData?.expense ?? "")}
        availableAmount={parseInt(weekData?.available ?? "")}
        showPredict={showPredict}
        isError={isError}
        dayTitle={isThisMonth ? "이번달" : moment(date).format("M월")}
      />

      <ThickDivider />

      {isThisMonth && <CalendarHeader date={date} handleClick={navigateTo} />}

      <WeeklyList
        isThisMonth={isThisMonth}
        isError={isError}
        date={month}
        navigateTo={navigateTo}
        weekData={weekData}
      />
    </Box>
  );
}

export default WeekSchedulePage;
