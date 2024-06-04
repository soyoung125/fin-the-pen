import { useScheduleForm } from "../../../../../../../../hooks/useScheduleForm.ts";
import DateButton from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/buttons/DateButton.tsx";
import { Stack } from "@mui/material";
import { ScheduleRepeat } from "@app/types/schedule.ts";

interface OptionProps {
  changeDayOfWeek: (week: string) => void;
  repeat: ScheduleRepeat;
}

function Option({ changeDayOfWeek, repeat }: OptionProps) {
  const selectedWeek = repeat.week_type.repeat_day_of_week ?? "";

  const weekName: { [key: string]: string } = {
    월: "MONDAY",
    화: "TUESDAY",
    수: "WEDNESDAY",
    목: "THURSDAY",
    금: "FRIDAY",
    토: "SATURDAY",
    일: "SUNDAY",
  };

  const handleChange = (w: string) => {
    const selected = selectedWeek.split(", ");
    if (selected.includes(w)) {
      changeDayOfWeek(selected.filter((s) => s !== w).join(", "));
      return;
    }
    changeDayOfWeek(selected.concat(w).join(", "));
  };

  return (
    <Stack px={2.5} my={1.5} direction="row" justifyContent="space-between">
      {Object.keys(weekName).map((w) => (
        <DateButton
          key={w}
          value={w}
          handleClick={() => handleChange(weekName[w])}
          isSelected={selectedWeek.includes(weekName[w])}
        />
      ))}
    </Stack>
  );
}

export default Option;
