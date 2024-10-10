import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import moment from "moment";
import { useCategoryDetail } from "@app/tanstack-query/reports/useCategoryDetail.ts";
import { useParams } from "react-router-dom";

const useCategoryReport = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const [year, month] = yearMonth.split("-").map((s) => Number(s));
  const { data: user } = useUser();
  const params = useParams();
  const {
    data: report,
    isPending,
    isError,
  } = useCategoryDetail({
    user_id: user?.user_id ?? "",
    date: `${yearMonth}-${moment().format("DD")}`,
    category: params.category.replace("-", "/") ?? "",
  });
  const { openMonthPicker } = useDatePicker();

  const addMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.add(1, "month").format("YYYY-MM"));
  };

  const subtractMonth = () => {
    const date = moment(yearMonth, "YYYY-MM");
    setYearMonth(date.subtract(1, "month").format("YYYY-MM"));
  };

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM"));
  };

  return {
    yearMonth,
    year,
    month,
    report,
    isPending,
    isError,
    addMonth,
    subtractMonth,
    pickMonth,
  };
};

export default useCategoryReport;
