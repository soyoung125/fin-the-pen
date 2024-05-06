import { Box, Grid, Typography } from "@mui/material";
import { UpdateStateInterface } from "@app/types/common.ts";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import moment from "moment";
import "moment/dist/locale/ko";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import { useScheduleForm } from "../../../../hooks/useScheduleForm.ts";
import SelectDateTime from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/DateInput/select/SelectDateTime/SelectDateTime.tsx";

interface InputDateTimeProps {
  date?: string;
  time?: string;
  type: InputDateTimeType;
  showError: boolean;
  isAllDay?: boolean;
}

export type InputDateTimeType = "start" | "end";

function InputDateTime({ date, time, type, isAllDay }: InputDateTimeProps) {
  const { updateSchedule } = useScheduleForm();

  const title = SCHEDULE_DRAWER[type];
  const { openDayPicker, openTimePicker } = useDatePicker();

  const changeSchedule = (state: UpdateStateInterface) => {
    updateSchedule(state);
  };

  const onClickDateField = async () => {
    if (!date) return;
    const newDate = await openDayPicker(date);
    if (newDate) {
      changeSchedule({
        target: {
          id: type + "_date",
          value: newDate,
        },
      });
    }
  };

  const onClickTimeField = async () => {
    const newTime = await openTimePicker({
      defaultTime: time as string,
    });
    if (newTime) {
      changeSchedule({
        target: {
          id: type + "_time",
          value: newTime,
        },
      });
    }
  };

  if (isAllDay) {
    return (
      <Box sx={{ py: 1 }}>
        <SelectDateTime
          dateTime={moment(date).format("YYYY/MM/DD dddd")}
          onClick={onClickDateField}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      <Typography variant="h2" color="#131416">
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectDateTime
            dateTime={moment(date).format("YYYY/MM/DD dddd")}
            onClick={onClickDateField}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectDateTime
            dateTime={moment(time, "hh:mm").format("LT")}
            paddingLeft
            onClick={onClickTimeField}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputDateTime;
