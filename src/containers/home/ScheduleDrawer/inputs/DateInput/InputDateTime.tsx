import CalenderBox from "@containers/home/HomeContainer/view/Calender/boxes/CalenderBox";
import { Box, Collapse, Input, InputAdornment, InputBase } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { UpdateStateInterface } from "@type/common";
import moment from "moment";

interface InputDateTimeProps {
  date: string | undefined;
  time: string | undefined;
  handleClick: () => void;
  title: string;
  changeSchedule: (
    state:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | UpdateStateInterface,
  ) => void;
  showCalendar: boolean;
}

function InputDateTime({
  date,
  time,
  handleClick,
  title,
  changeSchedule,
  showCalendar,
}: InputDateTimeProps) {
  return (
    <Box>
      <Input
        // type="date"
        fullWidth
        onClick={handleClick}
        id="date"
        startAdornment={
          <InputAdornment position="start">
            <Box sx={{ color: "primary.main", fontWeight: 500 }}>{title}</Box>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="start">
            <InputBase
              id="start_time"
              type="time"
              value={time}
              onChange={changeSchedule}
              onClick={(e) => e.stopPropagation()}
              inputProps={{
                style: { textAlign: "right" },
              }}
            />
          </InputAdornment>
        }
        value={date}
        onChange={changeSchedule}
      />
      <Collapse in={showCalendar}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CalenderBox dateHeight={50} dateSize={32} week={6}>
            <DateCalendar
              views={["year", "month", "day"]}
              disableHighlightToday
              dayOfWeekFormatter={(day) => day.substring(0, 3)}
              value={moment(date)}
              onChange={(newValue) => {
                newValue &&
                  changeSchedule({
                    target: {
                      id: "date",
                      value: newValue.format("YYYY-MM-DD"),
                    },
                  });
              }}
              reduceAnimations
            />
          </CalenderBox>
        </LocalizationProvider>
      </Collapse>
    </Box>
  );
}

export default InputDateTime;
