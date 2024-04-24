import ReportCategoryDetails from "@pages/reports/ReportCategoryDetails/ReportCategoryDetails.tsx";
import { Meta } from "@storybook/react";
import ScheduleListHeader from "components/ScheduleList/ScheduleListHeader";
import ReportCategorySummary from "@pages/reports/ReportCategoryDetails/components/ReportCategorySummary";
import ThickDivider from "@components/common/ThickDivider.tsx";
import { useState } from "react";
import ScheduleCard from "components/ScheduleList/ScheduleCard";
import ScheduleListPageHeader from "components/ScheduleList/ScheduleListPageHeader";
import ScheduleDateBox from "@components/ScheduleList/ScheduleDateBox/ScheduleDateBox.tsx";
import { INIT_PERIOD } from "@constants/schedule.ts";
import moment from "moment/moment";
import { Schedule } from "@app/types/schedule.ts";
import ReportCategoryBody from "@pages/reports/ReportCategoryDetails/components/ReportCategoryBody";

const meta = {
  title: "reports/ReportCategoryDetails",
  component: ReportCategoryDetails,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof ExamplePage>;

export default meta;

export const ExamplePage = () => {
  const options = ["최신순", "과거순", "높은 금액순", "낮은 금액순"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const schedules: Schedule[] = [
    {
      event_name: "마라탕",
      start_time: "10:00",
      end_time: "13:00",
      price_type: "-",
      amount: "15000",
      start_date: "2023-10-06",
      end_date: "2023-10-06",
      category: "외식",
      all_day: false,
      repeat_kind: "WEEK",
      repeat_options: { term: "1", options: "" },
      period: INIT_PERIOD(moment("2023-10-06")),
      fix_amount: false,
      payment_type: "상",
      exclude: Math.floor(Math.random() * 2) === 0,
    },
    {
      event_name: "떡볶이",
      start_time: "10:00",
      end_time: "13:00",
      price_type: "-",
      amount: "60000",
      start_date: "2023-10-06",
      end_date: "2023-10-06",
      category: "외식",
      all_day: false,
      repeat_kind: "NONE",
      repeat_options: { term: "1", options: "" },
      period: INIT_PERIOD(moment("2023-10-06")),
      fix_amount: false,
      payment_type: "상",
      exclude: Math.floor(Math.random() * 2) === 0,
    },
    {
      event_name: "양꼬치",
      start_time: "10:00",
      end_time: "13:00",
      price_type: "-",
      amount: "15000",
      start_date: "2023-10-06",
      end_date: "2023-10-06",
      category: "외식",
      all_day: false,
      repeat_kind: "NONE",
      repeat_options: { term: "1", options: "" },
      period: INIT_PERIOD(moment("2023-10-06")),
      fix_amount: false,
      payment_type: "상",
      exclude: Math.floor(Math.random() * 2) === 0,
    },
  ];

  return (
    <>
      <ScheduleListPageHeader
        date="2024년 5월"
        addMonth={() => alert("add month")}
        subtractMonth={() => alert("subtract month")}
        changeMonth={() => alert("change month")}
        handleClickSearch={() => alert("search")}
        handleClickFilter={() => alert("filter")}
      />

      <ThickDivider />

      <ReportCategorySummary
        goal={1000000}
        amount={750000}
        category="식비"
        data={[10, 55, 35]}
      />

      <ThickDivider />

      <ScheduleListHeader
        count={10}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <ScheduleDateBox date="2023-10-06" />
      {schedules.map((schedule) => (
        <ScheduleCard
          title={`${schedule.start_time}-${schedule.end_time}`}
          category={schedule.category}
          priceType={schedule.price_type}
          eventName={schedule.event_name}
          amount={Number(schedule.amount)}
          isPredict={moment().isBefore(schedule.end_date, "day")}
          isRepeat={schedule.repeat_kind !== "NONE"}
          onClick={() => alert("click")}
        />
      ))}
    </>
  );
};
