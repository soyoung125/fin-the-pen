import {
  selectScheduleForm,
  selectStartDate,
} from "@redux/slices/scheduleSlice.tsx";
import { useSelector } from "react-redux";
import RadioLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel";
import Option from "./Option.tsx";
import { useEffect, useState } from "react";
import moment from "moment";
import RepeatInputLabel from "../RepeatInputLabel.tsx";
import { RepeatProps } from "@app/types/schedule.ts";

function Year({ repeatType, repeat, handleChangeOption }: RepeatProps) {
  const schedule = useSelector(selectScheduleForm);
  const startDate = useSelector(selectStartDate);

  const [lastDate, setLastDate] = useState(moment());
  const [date, setDate] = useState({
    month: "01",
    date: "01",
    day: "월요일",
    week: 0,
  });

  useEffect(() => {
    const start = moment(startDate);
    const month = start.month() + 1;
    const firstWeek = moment(startDate).startOf("month").week();
    const thisWeek = month === 12 && start.week() === 1 ? 53 : start.week();

    setDate({
      month: start.format("MM"),
      date: start.format("DD"),
      day: start.format("dddd"),
      week: thisWeek - firstWeek,
    });
    setLastDate(start.endOf("month"));
  }, [startDate]);

  return (
    <>
      <RadioLabel
        value="year"
        label={
          <RepeatInputLabel
            label="매년"
            postInputLabel="년 마다"
            max={10}
            option="year"
            repeatType={repeatType}
            repeat={repeat}
            updateRepeat={handleChangeOption}
          />
        }
      />

      {repeatType === "year" && (
        <Option
          date={date}
          isLastDay={lastDate.diff(schedule?.start_date, "day") < 7}
        />
      )}
    </>
  );
}

export default Year;
