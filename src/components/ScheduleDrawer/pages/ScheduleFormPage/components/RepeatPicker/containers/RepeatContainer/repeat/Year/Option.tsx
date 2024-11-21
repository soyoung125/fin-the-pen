import OptionButton from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/buttons/OptionButton.tsx";
import { Stack } from "@mui/material";
import { ScheduleRepeat } from "@app/types/schedule.ts";

interface Option {
  repeat: ScheduleRepeat;
  date: { month: string; date: string; day: string; week: number };
  isLastDay: boolean;
  updateRepeat: (id: string, value: string) => void;
}

function Option({ repeat, date, isLastDay, updateRepeat }: Option) {
  const week = ["첫", "두", "세", "네", "다섯", "여섯"];
  const yearRepeat = repeat.year_type.year_category;

  const changeYearRepeat = (id: string, value: string) => {
    updateRepeat(id, value);
  };

  return (
    <Stack my={1.5} spacing={1} mx="auto" sx={{ width: "200px" }}>
      <OptionButton
        id="MonthAndDay"
        isSelected={yearRepeat === "MonthAndDay"}
        contents={`${date.month}월 ${date.date}일`}
        handleClick={() =>
          changeYearRepeat("MonthAndDay", `${date.month}월 ${date.date}일`)
        }
      />

      <OptionButton
        id="NthDayOfMonth"
        isSelected={yearRepeat === "NthDayOfMonth"}
        contents={`${date.month}월 ${week[date.week]}번째 ${date.day}`}
        handleClick={() =>
          changeYearRepeat(
            "NthDayOfMonth",
            `${date.month}월 ${date.week + 1}번째 ${date.day}`
          )
        }
      />

      {isLastDay && (
        <OptionButton
          id="LastDayOfMonth"
          isSelected={yearRepeat === "LastDayOfMonth"}
          contents={`${date.month}월 마지막 ${date.day}`}
          handleClick={() =>
            changeYearRepeat(
              "LastDayOfMonth",
              `${date.month}월 마지막 ${date.day}`
            )
          }
        />
      )}
    </Stack>
  );
}

export default Option;
