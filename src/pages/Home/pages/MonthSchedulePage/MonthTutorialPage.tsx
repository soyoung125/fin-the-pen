import MonthlyBudgetSummary from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import CalendarHeader from "@pages/Home/next-components/ScheduleCalendar/CalendarHeader";
import Calendar from "pages/Home/pages/MonthSchedulePage/components/Calendar";
import moment from "moment/moment";
import "moment/dist/locale/ko";
import ScheduleList from "@components/ScheduleList";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Schedule } from "@app/types/schedule.ts";
import { RefObject, useEffect } from "react";

function MonthTutorialPage({
  listRef,
}: {
  listRef: RefObject<HTMLDivElement>;
}) {
  const date = moment().format("YYYY.MM.DD");
  const todaySchedules: Schedule[] = [
    {
      schedule_id: "1",
      user_id: "test1234",
      event_name: "가족들과의 식사",
      category: "외식",
      start_date: "2024-02-02",
      end_date: "2024-02-02",
      start_time: "18:00",
      end_time: "21:00",
      all_day: false,
      repeat_options: {
        term: "2",
        options: "FRIDAY",
      },
      period: {
        repeat_number_time: "3",
        repeat_end_line: "2030-02-15",
        is_repeat_again: false,
      },
      price_type: "-",
      payment_type: "ACCOUNT",
      amount: "30000",
      repeat_kind: "WEEK",
      exclude: false,
      fix_amount: false,
    },
    {
      schedule_id: "1",
      user_id: "test1234",
      event_name: "가족들과의 식사",
      category: "외식",
      start_date: "2024-02-02",
      end_date: "2024-02-02",
      start_time: "18:00",
      end_time: "21:00",
      all_day: false,
      repeat_options: {
        term: "2",
        options: "FRIDAY",
      },
      period: {
        repeat_number_time: "3",
        repeat_end_line: "2030-02-15",
        is_repeat_again: false,
      },
      price_type: "-",
      payment_type: "ACCOUNT",
      amount: "30000",
      repeat_kind: "WEEK",
      exclude: false,
      fix_amount: false,
    },
    {
      schedule_id: "1",
      user_id: "test1234",
      event_name: "가족들과의 식사",
      category: "외식",
      start_date: "2024-02-02",
      end_date: "2024-02-02",
      start_time: "18:00",
      end_time: "21:00",
      all_day: false,
      repeat_options: {
        term: "2",
        options: "FRIDAY",
      },
      period: {
        repeat_number_time: "3",
        repeat_end_line: "2030-02-15",
        is_repeat_again: false,
      },
      price_type: "-",
      payment_type: "ACCOUNT",
      amount: "30000",
      repeat_kind: "WEEK",
      exclude: false,
      fix_amount: false,
    },
    {
      schedule_id: "1",
      user_id: "test1234",
      event_name: "가족들과의 식사",
      category: "외식",
      start_date: "2024-02-02",
      end_date: "2024-02-02",
      start_time: "18:00",
      end_time: "21:00",
      all_day: false,
      repeat_options: {
        term: "2",
        options: "FRIDAY",
      },
      period: {
        repeat_number_time: "3",
        repeat_end_line: "2030-02-15",
        is_repeat_again: false,
      },
      price_type: "-",
      payment_type: "ACCOUNT",
      amount: "30000",
      repeat_kind: "WEEK",
      exclude: false,
      fix_amount: false,
    },
  ];

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listRef]);

  return (
    <>
      <Box>
        <MonthlyBudgetSummary
          income={0}
          expenditure={0}
          availableAmount={0}
          showPredict={false}
          dayTitle="이번달"
        />

        <ThickDivider />

        <CalendarHeader
          date={date}
          count={todaySchedules.length}
          handleClick={() => {
            console.log("click");
          }}
          isToday={moment().isSame(date, "date")}
        />
        <Calendar
          value={date}
          handleChange={() => {
            console.log("click");
          }}
        />

        <ThickDivider />

        <div ref={listRef}>
          <ScheduleList
            date={date}
            todaySchedules={todaySchedules.slice(0, 3)}
            isError={false}
            isPending={false}
          />
        </div>

        {todaySchedules.length > 3 && (
          <Stack
            p={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
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
    </>
  );
}

export default MonthTutorialPage;
