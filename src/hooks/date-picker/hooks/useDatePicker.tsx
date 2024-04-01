import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import DatePicker from "@hooks/date-picker/components/DatePicker.tsx";
import moment from "moment/moment";
import MonthPicker from "@hooks/date-picker/components/MonthPicker.tsx";
import TimePicker from "@hooks/date-picker/components/TimePicker.tsx";
import MonthPeriodPicker from "@hooks/date-picker/components/MonthPeriodPicker.tsx";
import DatePeriodPicker from "@hooks/date-picker/components/DatePeriodPicker.tsx";

export const useDatePicker = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const openDayPicker = (defaultDate: string): Promise<string> => {
    return new Promise((resolve) => {
      openOverlay(
        <DatePicker
          defaultDate={defaultDate}
          onClickApprove={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
          onClickReject={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
        />
      );
    });
  };

  const openDayPeriodPicker = (
    defaultStartDate: string,
    defaultEndDate: string
  ): Promise<{ start: string; end: string }> => {
    return new Promise((resolve) => {
      openOverlay(
        <DatePeriodPicker
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          onClickApprove={(start, end) => {
            resolve({ start, end });
            closeOverlay();
          }}
          onClickReject={(start, end) => {
            resolve({ start, end });
            closeOverlay();
          }}
        />
      );
    });
  };

  const openMonthPicker = (defaultDate: string): Promise<moment.Moment> => {
    return new Promise((resolve) => {
      openOverlay(
        <MonthPicker
          defaultDate={defaultDate}
          onClickApprove={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
          onClickReject={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
        />
      );
    });
  };

  const openMonthPeriodPicker = (
    defaultStartDate: string,
    defaultEndDate: string
  ): Promise<{ start: string; end: string }> => {
    return new Promise((resolve) => {
      openOverlay(
        <MonthPeriodPicker
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          onClickApprove={(start, end) => {
            resolve({ start, end });
            closeOverlay();
          }}
          onClickReject={(start, end) => {
            resolve({ start, end });
            closeOverlay();
          }}
        />
      );
    });
  };

  const openTimePicker = ({
    defaultTime,
  }: {
    defaultTime: string;
  }): Promise<string> => {
    return new Promise((resolve) => {
      openOverlay(
        <TimePicker
          defaultTime={defaultTime}
          onClickApprove={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
          onClickReject={(answer) => {
            resolve(answer);
            closeOverlay();
          }}
        />
      );
    });
  };

  return {
    openDayPicker,
    openDayPeriodPicker,
    openMonthPicker,
    openMonthPeriodPicker,
    openTimePicker,
    closeDatePicker: closeOverlay,
  };
};
