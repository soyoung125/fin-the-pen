import { selectStartDate } from "@redux/slices/scheduleSlice.tsx";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import RadioLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel";
import { useEffect, useState } from "react";
import moment from "moment";
import Input from "./Input.tsx";
import { PeriodProps } from "@app/types/schedule.ts";

function EndDate({
  handleChangeOption,
  period,
}: Omit<PeriodProps, "periodType">) {
  const startDate = useSelector(selectStartDate);
  const repeatEndDate = period.repeat_end_line;

  const [date, setDate] = useState({
    year: 2023,
    month: 1,
    date: 1,
    day: "월요일",
  });

  useEffect(() => {
    const oldEndDate = moment(
      `${date.year}-${date.month}-${date.date}`,
      "YYYY-M-D"
    );
    const newEndDate = moment(repeatEndDate);

    if (oldEndDate.isSame(newEndDate)) return;

    setDate({
      year: newEndDate.year(),
      month: newEndDate.month() + 1,
      date: newEndDate.date(),
      day: newEndDate.format("dddd"),
    });
  }, [repeatEndDate]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value, min, max } = e.target;
    let newValue = Number(value);
    if (newValue < Number(min)) newValue = Number(min);
    if (newValue > Number(max)) newValue = Number(max);

    let d = "";

    switch (id) {
      case "year": {
        d = `${newValue}-${date.month}-${date.date}`;
        setDate({
          ...date,
          year: newValue,
          day: moment(d, "YYYY-M-D").format("dddd"),
        });
        break;
      }
      case "month": {
        d = `${date.year}-${newValue}-${date.date}`;
        setDate({
          ...date,
          month: newValue,
          day: moment(d, "YYYY-M-D").format("dddd"),
        });
        break;
      }
      case "date": {
        d = `${date.year}-${date.month}-${newValue}`;
        setDate({
          ...date,
          date: newValue,
          day: moment(d, "YYYY-M-D").format("dddd"),
        });
        break;
      }
      default:
        return;
    }
    handleChangeOption({ target: { id: "repeat_end_line", value: d } });
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setDate({
      ...date,
      [e.target.id]: Number(e.target.value) || "",
    });
  };

  return (
    <>
      <RadioLabel value="repeat_end_line" label="종료 날짜" />

      {period.kind_type === "repeat_end_line" && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          mt={0.5}
        >
          <Input
            id="year"
            value={date.year}
            handleBlur={handleBlur}
            handleChange={handleChange}
            min={moment(startDate).year()}
            max={moment(startDate).year() + 50}
            width="60px"
          />

          <Box>년</Box>

          <Input
            id="month"
            value={date.month}
            handleBlur={handleBlur}
            handleChange={handleChange}
            max={12}
          />

          <Box>월</Box>

          <Input
            id="date"
            value={date.date}
            handleBlur={handleBlur}
            handleChange={handleChange}
            max={moment(`${date.year}-${date.month}`, "YYYY-M").daysInMonth()}
          />

          <Box>일</Box>

          <Box>{date.day}</Box>
        </Stack>
      )}
    </>
  );
}

export default EndDate;
