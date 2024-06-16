import { CategoryDetail } from "@app/types/report.ts";
import React, { useEffect, useRef, useState } from "react";
import ReportEmptyBox from "@pages/reports/ReportMonthDetails/components/ReportEmptyBox";
import ReportCategorySummary from "@pages/reports/ReportCategoryDetails/components/ReportCategorySummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import ScheduleListHeader from "components/ScheduleList/ScheduleListHeader";
import ScheduleList from "@components/ScheduleList";
import ReportCategorySummarySkeleton from "@pages/reports/ReportCategoryDetails/components/ReportCategorySummary/ReportCategorySummarySkeleton.tsx";
import ScheduleListSkeleton from "@components/ScheduleList/ScheduleListSkeleton.tsx";
import TodayButton from "@components/common/TodayButton/TodayButton.tsx";
import moment from "moment/moment";
import { Box } from "@mui/material";

export interface ReportCategoryBodyProps {
  report?: CategoryDetail;
  isPending: boolean;
  handleClickAddSchedule: () => void;
}

function ReportCategoryBody({
  report,
  isPending,
  handleClickAddSchedule,
}: ReportCategoryBodyProps) {
  const options = ["최신순", "과거순"];
  const todayRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [scheduleDates, setScheduleDates] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const targetRef = todayRef.current;
    if (targetRef) {
      observer.observe(targetRef);
    }

    return () => {
      if (targetRef) {
        observer.unobserve(targetRef);
      }
    };
  }, []);

  useEffect(() => {
    const keys = Object.keys(report?.month_schedule ?? {});
    if (selectedOption === "최신순") {
      setScheduleDates(keys);
    } else {
      setScheduleDates(keys.reverse());
    }
  }, [report, selectedOption]);

  if (isPending) {
    return (
      <>
        <ReportCategorySummarySkeleton />
        <ThickDivider />
        <ScheduleListHeader
          count={0}
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ScheduleListSkeleton />
      </>
    );
  }

  if (scheduleDates.length === 0) {
    return <ReportEmptyBox handleClickAddSchedule={handleClickAddSchedule} />;
  }

  const scrollToToday = () => {
    if (todayRef.current) {
      window.scrollTo({
        top: todayRef.current.offsetTop - 134,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <ReportCategorySummary
        goal={Number(report?.category_expect)}
        amount={Number(report?.category_expense)}
        category={report?.category ?? ""}
        data={[20, 10, 70]}
      />
      <ThickDivider />
      <Box
        sx={{
          position: "sticky",
          top: 96,
          backgroundColor: "#FFF",
          zIndex: 1000,
        }}
      >
        <ScheduleListHeader
          count={report?.count ?? 0}
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </Box>

      {scheduleDates.map((date) => {
        const schedules = report?.month_schedule[date] ?? [];
        const todaySchedules =
          selectedOption === "과거순" ? schedules.reverse() : schedules;
        return (
          <div
            ref={moment().isSame(date, "date") ? todayRef : undefined}
            key={date}
          >
            <ScheduleList
              showHeader
              date={date}
              todaySchedules={todaySchedules}
              isError={!todaySchedules}
              isPending={isPending}
            />
          </div>
        );
      })}
      {!isVisible && <TodayButton goToday={scrollToToday} type="day" />}
    </>
  );
}

export default ReportCategoryBody;
