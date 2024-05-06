import { useSelector } from "react-redux";
import {
  selectDate,
  selectMonth,
  setDrawerScheduleForm,
} from "@redux/slices/scheduleSlice.tsx";
import { RequestSchedule } from "@app/types/schedule.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import { v4 as uuidv4 } from "uuid";
import { useCreateSchedule } from "@app/tanstack-query/schedules/useCreateSchedule.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { INIT_SCHEDULE } from "@constants/schedule.ts";
import { useModifySchedule } from "@app/tanstack-query/schedules/useModifySchedule.ts";
import { useDeleteSchedule } from "@app/tanstack-query/schedules/useDeleteSchedule.ts";
import { useMonthSchedules } from "@app/tanstack-query/home/useMonthSchedules.ts";

const useSchedule = () => {
  const dispatch = useAppDispatch();

  const date = useSelector(selectDate);
  const month = useSelector(selectMonth);

  const { data: user } = useUser();
  const { createSchedule } = useCreateSchedule();
  const { modifySchedule } = useModifySchedule();
  const { deleteSchedule } = useDeleteSchedule();
  const { data, isPending, isError } = useMonthSchedules({
    user_id: user?.user_id ?? "",
    main_month: month,
    calendar_date: date,
  });

  const schedules = data?.data;

  const handleCreateSchedule = async (schedule: RequestSchedule) => {
    if (!user) {
      return alert("로그인이 필요합니다.");
    }

    const scheduleWithUuid = {
      ...schedule,
      schedule_id: uuidv4(),
      user_id: user.user_id,
    };

    createSchedule(scheduleWithUuid);
    resetSchedule();
  };

  const handleDeleteSchedule = async (
    schedule: RequestSchedule,
    answer: string
  ) => {
    if (user) {
      deleteSchedule(schedule, answer, user.user_id);
    }
  };

  const handleModifySchedule = async (
    schedule: RequestSchedule,
    answer: string
  ) => {
    modifySchedule(schedule, answer);
  };

  const resetSchedule = () => {
    dispatch(setDrawerScheduleForm(INIT_SCHEDULE(date)));
  };

  return {
    data,
    schedules,
    isPending,
    isError,
    date,
    month,
    handleDeleteSchedule,
    handleCreateSchedule,
    handleModifySchedule,
    resetSchedule,
  };
};

export default useSchedule;
