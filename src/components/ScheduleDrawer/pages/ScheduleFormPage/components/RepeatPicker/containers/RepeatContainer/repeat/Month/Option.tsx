import { selectStartDate } from "@redux/slices/scheduleSlice.tsx";
import DateButton from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/buttons/DateButton.tsx";
import OptionButton from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/buttons/OptionButton.tsx";
import { Grid } from "@mui/material";
import { RepeatProps } from "@app/types/schedule.ts";
import moment from "moment";
import { useSelector } from "react-redux";

function Option({
  handleChangeOption,
  repeat,
}: Omit<RepeatProps, "repeatType">) {
  const startDate = useSelector(selectStartDate);
  const months = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const todayRepeat = repeat.month_type.today_repeat ?? true;
  const selectedDate = repeat.month_type.select_date.split(", ") ?? [];

  const changeSelectDate = (date: string) => {
    handleChangeOption({ target: { id: "select_date", value: date } });
  };

  const handleClick = (d: string) => {
    if (selectedDate.includes(d)) {
      changeSelectDate(selectedDate.filter((s) => s !== d).join(", "));
      return;
    }
    changeSelectDate(selectedDate.concat(d).join(", "));
  };

  const changeTodayRepeat = (e: React.MouseEvent) => {
    if (e.currentTarget.id === "todayRepeat") {
      handleChangeOption({ target: { id: "today_repeat", value: true } });
    } else {
      handleChangeOption({ target: { id: "today_repeat", value: false } });
    }
  };

  return (
    <Grid container px={2.5} py={1.5} columns={14} spacing={1.5}>
      <Grid item xs={7}>
        <OptionButton
          id="todayRepeat"
          isSelected={todayRepeat}
          contents={`${moment(startDate).date()}일마다 반복`}
          handleClick={changeTodayRepeat}
        />
      </Grid>

      <Grid item xs={7}>
        <OptionButton
          id="selectDate"
          isSelected={!todayRepeat}
          contents="반복할 날짜 선택"
          handleClick={changeTodayRepeat}
        />
      </Grid>

      {!todayRepeat &&
        months.map((d, i) => (
          <Grid
            item
            xs={2}
            display="flex"
            mt={2.5}
            justifyContent="center"
            key={i}
          >
            <DateButton
              value={d}
              handleClick={() => handleClick(d)}
              isSelected={selectedDate.includes(d)}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default Option;
