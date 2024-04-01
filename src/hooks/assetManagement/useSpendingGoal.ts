import { useUser } from "@app/tanstack-query/useUser.ts";
import { useGoals } from "@app/tanstack-query/assetManagement/savingGoal/useGoals.ts";
import { useSetSavingGoal } from "@app/tanstack-query/assetManagement/savingGoal/useSetSavingGoal.ts";
import { SetPersonalGoalQuery, setSpendingGoal } from "@app/types/asset.ts";
import { useSetPersonalGoal } from "@app/tanstack-query/assetManagement/savingGoal/useSetPersonalGoal.ts";
import { useSpendingGoals } from "@app/tanstack-query/assetManagement/spedingGoal/useSpendingGoals.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";

const useSpendingGoal = () => {
  const [yearMonth, setYearMonth] = useState(moment().format("YYYY-MM"));
  const { openMonthPicker } = useDatePicker();

  const { data: user } = useUser();
  const {
    data: goal,
    isPending,
    isError,
  } = useSpendingGoals(user?.user_id ?? "", yearMonth);
  // const { setSavingGoal } = useSetSavingGoal();
  const { setPersonalGoal } = useSetPersonalGoal();

  const pickMonth = async () => {
    const newMonth = await openMonthPicker(yearMonth);
    setYearMonth(newMonth.format("YYYY-MM-DD"));
  };

  // const handleSetSpendingGoal = (data: setSpendingGoal) => {
  //   setSavingGoal({
  //     ...data,
  //     user_id: user?.user_id ?? ""
  //   });
  // };

  return {
    goal,
    isPending,
    isError,
    yearMonth,
    pickMonth,
    // handleSetSpendingGoal,
  };
};

export default useSpendingGoal;
