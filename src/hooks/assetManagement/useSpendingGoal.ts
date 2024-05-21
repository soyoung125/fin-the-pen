import { useUser } from "@app/tanstack-query/useUser.ts";
import { useSpendingGoals } from "@app/tanstack-query/assetManagement/spedingGoal/useSpendingGoals.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import { setSpendingGoal } from "@app/types/asset.ts";
import { useSetSpendingGoal } from "@app/tanstack-query/assetManagement/spedingGoal/useSetSpendingGoal.ts";
import { useReports } from "@app/tanstack-query/reports/useReports.ts";

const useSpendingGoal = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const { openMonthPicker } = useDatePicker();
  const [year, month] = yearMonth.split("-");

  const { data: user } = useUser();
  const {
    data: goal,
    isPending,
    isError,
  } = useSpendingGoals(user?.user_id ?? "", yearMonth);
  const { data: report } = useReports({
    user_id: user?.user_id ?? "",
    date: `${yearMonth}-${moment().format("DD")}`,
  });
  const { setSpendingGoal } = useSetSpendingGoal();

  const onSpendAmount = goal?.OnSpendAmount ?? {
    user_id: user?.user_id,
    date: yearMonth,
    start_date: yearMonth,
    end_date: yearMonth,
    spend_goal_amount: "?",
    spend_amount: "?",
  };

  const offSpendAmount = goal?.offSpendAmount ?? onSpendAmount;

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM"));
  };

  const handleSetSpendingGoal = (data: setSpendingGoal) => {
    setSpendingGoal({
      ...data,
      user_id: user?.user_id ?? "",
    });
  };

  return {
    userName: user?.name,
    monthlyReport: report?.monthly_report,
    month: Number(month),
    offSpendAmount,
    onSpendAmount,
    isPending,
    isError,
    yearMonth,
    pickMonth,
    handleSetSpendingGoal,
  };
};

export default useSpendingGoal;
