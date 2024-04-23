import { useUser } from "@app/tanstack-query/useUser.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import { useRegularAssets } from "@app/tanstack-query/assetManagement/RegularAsset/useRegularAssets.ts";
import { Schedule } from "@app/types/schedule.ts";

const useRegularAsset = () => {
  const today = moment();
  const [period, setPeriod] = useState({
    start: today.startOf("year").format("YYYY-MM-DD"),
    end: today.endOf("year").format("YYYY-MM-DD"),
  });
  const { openDayPeriodPicker } = useDatePicker();

  const { data: user } = useUser();
  const {
    data: schedules,
    isError,
    isPending,
  } = useRegularAssets({
    user_id: user?.user_id ?? "",
    start_date: period.start,
    end_date: period.end,
  });
  const isDuplicated = (result: Schedule[], curr: Schedule) =>
    result.find((s) => s.event_name === curr.event_name);
  
  const spendSchedules =
    schedules?.reduce((result: Schedule[], curr) => {
      if (curr.price_type === "Minus" && !isDuplicated(result, curr)) {
        return result.concat(curr);
      }
      return result;
    }, []) ?? [];

  const saveSchedules =
    schedules?.reduce((result: Schedule[], curr) => {
      if (curr.price_type === "Plus" && !isDuplicated(result, curr)) {
        return result.concat(curr);
      }
      return result;
    }, []) ?? [];

  const pickDate = async () => {
    const newMonth = await openDayPeriodPicker(period.start, period.end);
    setPeriod(newMonth);
  };

  return {
    spendSchedules,
    saveSchedules,
    isPending,
    isError,
    startDate: period.start,
    endDate: period.end,
    pickDate,
  };
};

export default useRegularAsset;
