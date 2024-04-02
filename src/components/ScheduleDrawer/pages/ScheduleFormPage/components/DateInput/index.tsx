import { Stack, Typography } from "@mui/material";
import SwitchButton from "@components/common/SwitchButton.tsx";
import InputDateTime from "./InputDateTime.tsx";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { useScheduleForm } from "../../../../hooks/useScheduleForm.ts";

interface DateInputProps {
  showError: boolean;
}

function DateInput({ showError }: DateInputProps) {
  const { scheduleForm, updateAllDay } = useScheduleForm();
  const isAllDay = scheduleForm?.is_all_day ?? false;

  const changeAllDay = (state: {
    target: { value: boolean; name: string };
  }) => {
    updateAllDay(state);
  };

  return (
    <Stack sx={{ px: 2.5 }}>
      <InputDateTime
        date={scheduleForm?.start_date}
        time={scheduleForm?.start_time}
        type="start"
        showError={showError}
        isAllDay={isAllDay}
      />

      {!isAllDay && (
        <InputDateTime
          date={scheduleForm?.end_date}
          time={scheduleForm?.end_time}
          type="end"
          showError={showError}
        />
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "34px", py: 1 }}
      >
        <Typography variant="h4">{SCHEDULE_DRAWER.all_day}</Typography>
        <SwitchButton
          checked={isAllDay}
          handleChange={() =>
            changeAllDay({
              target: {
                value: !scheduleForm?.is_all_day,
                name: "is_all_day",
              },
            })
          }
          disabled={scheduleForm?.repeat.kind_type !== "none"}
        />
      </Stack>
    </Stack>
  );
}

export default DateInput;
