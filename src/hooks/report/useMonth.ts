import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import { selectReportDate, setReportDate } from "@redux/slices/assetSlice.tsx";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";

const useMonth = () => {
  const dispatch = useAppDispatch();
  const reportDate = useAppSelector(selectReportDate);

  const { openMonthPicker } = useDatePicker();

  const yearMonth = moment(reportDate).format("YYYY-MM");
  const [year, month] = yearMonth.split("-").map((s) => Number(s));

  const addMonth = () => {
    dispatch(
      setReportDate(moment(reportDate).add(1, "month").format("YYYY-MM-DD"))
    );
  };

  const subtractMonth = () => {
    dispatch(
      setReportDate(
        moment(reportDate).subtract(1, "month").format("YYYY-MM-DD")
      )
    );
  };

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    dispatch(setReportDate(newMonth.format("YYYY-MM-DD")));
  };

  return {
    date: reportDate,
    yearMonth,
    year,
    month,
    addMonth,
    subtractMonth,
    pickMonth,
  };
};

export default useMonth;
