import {
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

interface MonthPeriodPickerProps {
  defaultStartDate: string;
  defaultEndDate: string;
  onClickApprove: (start: string, end: string) => void;
  onClickReject: (start: string, end: string) => void;
}

function MonthPeriodPicker({
  defaultStartDate,
  defaultEndDate,
  onClickApprove,
  onClickReject,
}: MonthPeriodPickerProps) {
  const [newDate, setNewDate] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  const [isSelectStartDate, setIsSelectStartDate] = useState(true);

  const changeDate = (date: string) => {
    console.log(date);
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
  };

  const changeStartAndEndDate = (date: string) => {
    setNewDate({ ...newDate, startDate: date, endDate: date });
  };

  const handleSetDate = () => {
    const { startDate, endDate } = newDate;
    onClickApprove(startDate, endDate);
  };

  // const renderDayInPicker = (props: PickersDayProps<moment.Moment>) => {
  //   const { day, ...other } = props;
  //   const { startDate, endDate } = newDate;
  //   if (moment(startDate).isSame(endDate)) {
  //     return <PickersDay {...props} />;
  //   }
  //   if (moment(startDate).isSame(day)) {
  //     return (
  //       <PickersDay
  //         sx={{
  //           borderTopRightRadius: 0,
  //           borderBottomRightRadius: 0,
  //           marginX: 0,
  //           width: "40px",
  //         }}
  //         className="Mui-selected"
  //         {...props}
  //       />
  //     );
  //   }
  //   if (moment(endDate).isSame(day)) {
  //     return (
  //       <PickersDay
  //         sx={{
  //           borderTopLeftRadius: 0,
  //           borderBottomLeftRadius: 0,
  //           marginX: 0,
  //           width: "40px",
  //         }}
  //         className="Mui-selected"
  //         {...props}
  //       />
  //     );
  //   }
  //   if (moment(startDate).isBefore(day) && moment(endDate).isAfter(day)) {
  //     return (
  //       <PickersDay
  //         sx={{
  //           borderRadius: 0,
  //           marginX: 0,
  //           width: "40px",
  //         }}
  //         className="Mui-selected"
  //         {...props}
  //       />
  //     );
  //   }
  //   return <PickersDay {...props} />;
  // };

  return (
    <Modal>
      <DialogTitle id="alert-dialog-title">날짜 선택</DialogTitle>
      <DialogContent>
        {isSelectStartDate
          ? `시작일: ${newDate.startDate}`
          : `종료일: ${newDate.endDate}`}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateCalendar
            views={["year", "month"]}
            openTo="year"
            value={moment(
              isSelectStartDate ? newDate.startDate : newDate.endDate
            )}
            onChange={(newValue) => {
              newValue && changeDate(newValue.format("YYYY-MM"));
            }}
            // slots={{
            //   day: renderDayInPicker,
            // }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        {isSelectStartDate ? (
          <Button onClick={() => setIsSelectStartDate(false)} autoFocus>
            다음
          </Button>
        ) : (
          <>
            <Button onClick={() => setIsSelectStartDate(true)} autoFocus>
              이전
            </Button>
            <Button onClick={handleSetDate} autoFocus>
              설정
            </Button>
          </>
        )}
      </DialogActions>
    </Modal>
  );
}

export default MonthPeriodPicker;
