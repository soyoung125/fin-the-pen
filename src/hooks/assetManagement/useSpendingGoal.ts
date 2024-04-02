import { useUser } from "@app/tanstack-query/useUser.ts";
import { useSpendingGoals } from "@app/tanstack-query/assetManagement/spedingGoal/useSpendingGoals.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import { setSpendingGoal } from "@app/types/asset.ts";
import { useSetSpendingGoal } from "@app/tanstack-query/assetManagement/spedingGoal/useSetSpendingGoal.ts";

const useSpendingGoal = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const { openMonthPicker } = useDatePicker();

  const { data: user } = useUser();
  const {
    data: goal,
    isPending,
    isError,
  } = useSpendingGoals(user?.user_id ?? "", yearMonth);
  const { setSpendingGoal } = useSetSpendingGoal();

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM-DD"));
  };

  const handleSetSpendingGoal = (data: setSpendingGoal) => {
    setSpendingGoal({
      ...data,
      user_id: user?.user_id ?? "",
    });
  };

  return {
    goal,
    isPending,
    isError,
    yearMonth,
    pickMonth,
    handleSetSpendingGoal,
  };
};

export default useSpendingGoal;
