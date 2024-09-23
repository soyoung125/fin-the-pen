import useDaySchedule from "@hooks/home/useDaySchedule.ts";
import MonthlyBudgetSummary from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CalendarHeader from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader";
import moment from "moment";
import MonthlyBudgetSummarySkeleton from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary/MonthlyBudgetSummarySkeleton.tsx";
import CalendarHeaderSkeleton from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader/CalendarHeaderSkeleton.tsx";
import ScheduleList from "@components/ScheduleList";
import ScheduleListSkeleton from "@components/ScheduleList/ScheduleListSkeleton.tsx";
import { HomePageProps } from "@pages/Home/Home.tsx";
import { useEffect } from "react";
import useMonthSchedule from "@hooks/home/useMonthSchedule.ts";

function DaySchedulePage({ updateHeight, navigateTo }: HomePageProps) {
  const { date, dayData, isError, isPending } = useDaySchedule();
  const { todaySchedules } = useMonthSchedule();
  const isToday = moment().isSame(date, "day");
  const showPredict = moment().isSameOrBefore(date, "day");

  useEffect(() => {
    updateHeight();
  }, [dayData]);

  if (isPending) {
    return (
      <div>
        <MonthlyBudgetSummarySkeleton
          expect={true}
          dayTitle={isToday ? "오늘의" : moment(date).format("M월D일")}
          showPredict={showPredict}
        />
        <ThickDivider />
        <CalendarHeaderSkeleton date={date} />
        <ScheduleListSkeleton />
      </div>
    );
  }

  return (
    <div>
      <MonthlyBudgetSummary
        income={Number(dayData?.income)}
        expenditure={Number(dayData?.dayExpense)}
        availableAmount={Number(dayData?.available ?? 0)}
        expect={Number(dayData?.expect ?? 0)}
        dayTitle={isToday ? "오늘의" : moment(date).format("M월D일")}
        showPredict={showPredict}
        isError={isError}
      />

      <ThickDivider />

      <CalendarHeader
        date={date}
        count={todaySchedules.length}
        handleClick={navigateTo}
        isToday={moment().isSame(date, "day")}
      />

      <ScheduleList
        date={date}
        todaySchedules={todaySchedules}
        isError={isError}
        isPending={isPending}
      />
    </div>
  );
}

export default DaySchedulePage;
