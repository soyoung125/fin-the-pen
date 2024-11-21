import {
  LocalizationProvider,
  MobileDatePicker,
  PickersDay,
  PickersDayProps,
  koKR,
} from "@mui/x-date-pickers";
import { InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import moment from "moment";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InputGrid from "./InputGrid";
import { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

interface PeriodInputProps {
  startDate: string;
  endDate: string;
  isSelectStartDate: boolean;
  changeDate: (date: string) => void;
}

function PeriodInput({ startDate, endDate, changeDate }: PeriodInputProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const renderDayInPicker = (props: PickersDayProps<moment.Moment>) => {
    const { day, ...other } = props;
    if (moment(startDate).isSame(endDate)) {
      return <PickersDay {...props} />;
    }
    if (moment(startDate).isSame(day)) {
      return (
        <PickersDay
          sx={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            marginX: 0,
            width: "40px",
          }}
          className="Mui-selected"
          {...props}
        />
      );
    }
    if (moment(endDate).isSame(day)) {
      return (
        <PickersDay
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginX: 0,
            width: "40px",
          }}
          className="Mui-selected"
          {...props}
        />
      );
    }
    if (moment(startDate).isBefore(day) && moment(endDate).isAfter(day)) {
      return (
        <PickersDay
          sx={{
            borderRadius: 0,
            marginX: 0,
            width: "40px",
          }}
          className="Mui-selected"
          {...props}
        />
      );
    }
    return <PickersDay {...props} />;
  };

  return (
    <InputGrid title="조회기간">
      <Grid>
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          localeText={
            koKR.components.MuiLocalizationProvider.defaultProps.localeText
          }
          dateFormats={{ monthAndYear: "YYYY-MM" }}
        >
          <MobileDatePicker
            value={moment(startDate)}
            onChange={(newValue) => {
              newValue && changeDate(newValue.format("YYYY-MM-DD"));
            }}
            open={openCalendar}
            onClose={() => setOpenCalendar(false)}
            slots={{
              day: renderDayInPicker,
            }}
            slotProps={{
              textField: {
                sx: { display: "none" },
              },
              actionBar: {
                actions: ["accept"],
              },
              toolbar: {
                hidden: true,
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          onClick={() => {
            setOpenCalendar(true);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayOutlinedIcon
                  fontSize="small"
                  color={endDate === "" ? "secondary" : "primary"}
                />
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: { textAlign: "right" },
          }}
          size="small"
          value={`${startDate}~${endDate}`}
        />
      </Grid>
    </InputGrid>
  );
}

export default PeriodInput;
