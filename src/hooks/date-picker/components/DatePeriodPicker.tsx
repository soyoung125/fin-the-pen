import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import moment from "moment/moment";
import Modal from "@hooks/modal/Modal.tsx";
import "moment/dist/locale/ko";

interface DatePeriodPickerProps {
  defaultStartDate: string;
  defaultEndDate: string;
  onClickApprove: (start: string, end: string) => void;
  onClickReject: (start: string, end: string) => void;
}

function DatePeriodPicker({
  defaultStartDate,
  defaultEndDate,
  onClickApprove,
  onClickReject,
}: DatePeriodPickerProps) {
  const [newDate, setNewDate] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  const [isSelectStartDate, setIsSelectStartDate] = useState(true);

  const changeDate = (date: string) => {
    if (isSelectStartDate) {
      if (moment(date).isAfter(newDate.endDate)) {
        changeStartAndEndDate(date);
      } else {
        setNewDate({ ...newDate, startDate: date });
      }
    } else {
      if (moment(date).isBefore(newDate.startDate)) {
        changeStartAndEndDate(date);
      } else {
        setNewDate({ ...newDate, endDate: date });
      }
    }
    setIsSelectStartDate((prev) => !prev);
  };

  const changeStartAndEndDate = (date: string) => {
    setNewDate({ ...newDate, startDate: date, endDate: date });
  };

  const handleSetDate = () => {
    const { startDate, endDate } = newDate;
    onClickApprove(startDate, endDate);
  };

  const renderDayInPicker = (props: PickersDayProps<moment.Moment>) => {
    const { day, ...other } = props;
    const { startDate, endDate } = newDate;
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
    <Modal>
      <DialogTitle id="alert-dialog-title">날짜 선택</DialogTitle>
      <DialogContent>
        <Box>{`시작일: ${newDate.startDate} ~ 종료일: ${newDate.endDate}`}</Box>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateCalendar
            views={["year", "month", "day"]}
            openTo="day"
            value={moment(
              isSelectStartDate ? newDate.startDate : newDate.endDate
            )}
            onChange={(newValue) => {
              newValue && changeDate(newValue.format("YYYY-MM-DD"));
            }}
            slots={{
              day: renderDayInPicker,
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetDate} autoFocus>
          설정
        </Button>
      </DialogActions>
    </Modal>
  );
}

export default DatePeriodPicker;
