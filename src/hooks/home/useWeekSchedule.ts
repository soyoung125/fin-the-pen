import { useSelector } from "react-redux";
import { selectDate, selectMonth } from "@redux/slices/scheduleSlice.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { useWeekSchedules } from "@app/tanstack-query/home/useWeekSchedules.ts";

const useWeekSchedule = () => {
  const date = useSelector(selectDate);
  const month = useSelector(selectMonth);

  const { data: user } = useUser();
  const {
    data: weekData,
    isPending,
    isError,
  } = useWeekSchedules({
    user_id: user?.user_id ?? "",
    main_month: month,
    calendar_date: date,
  });

  return {
    weekData,
    isPending,
    isError,
    date,
    month,
  };
};

export default useWeekSchedule;
