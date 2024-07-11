import { useUser } from "@app/tanstack-query/useUser.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import { Schedule } from "@app/types/schedule.ts";
import { useParams } from "react-router-dom";
import { useTemplateByPriceType } from "@app/tanstack-query/templates/useTemplateByPriceType.ts";
import { useDeleteTemplate } from "@app/tanstack-query/templates/useDeleteTemplate.ts";

const useRegularAsset = () => {
  const today = moment();
  const [period, setPeriod] = useState({
    start: today.startOf("year").format("YYYY-MM-DD"),
    end: today.endOf("year").format("YYYY-MM-DD"),
  });
  const { openDayPeriodPicker } = useDatePicker();
  const { eventName, category } = useParams();

  const { data: user } = useUser();
  // const {
  //   data: schedules,
  //   isError,
  //   isPending,
  // } = useRegularAssets({
  //   user_id: user?.user_id ?? "",
  //   start_date: period.start,
  //   end_date: period.end,
  // });
  const { data, isPending, isError } = useTemplateByPriceType({
    user_id: user?.user_id ?? "",
  });
  const { deleteTemplate } = useDeleteTemplate();

  const yearOptions = Array.from(
    { length: moment(period.end).year() - moment(period.start).year() + 1 },
    (_, i) => (moment(period.start).year() + i).toString()
  );

  const isDuplicated = (result: Schedule[], curr: Schedule) =>
    result.find((s) => s.event_name === curr.event_name);

  const spendSchedules = data?.deposit ?? [];

  const saveSchedules = data?.withdraw ?? [];

  const templateCount = spendSchedules.length + saveSchedules.length;

  const detailSchedules: Schedule[] = [
    {
      schedule_id: "1",
      user_id: "test1234",
      event_name: "가족들과의 식사",
      category: "외식",
      start_date: "2024-02-02",
      end_date: "2024-02-02",
      start_time: "18:00",
      end_time: "21:00",
      all_day: false,
      repeat_options: {
        term: "2",
        options: "FRIDAY",
      },
      period: {
        repeat_number_time: "3",
        repeat_end_line: "2030-02-15",
        is_repeat_again: false,
      },
      price_type: "-",
      payment_type: "ACCOUNT",
      amount: "30000",
      repeat_kind: "WEEK",
      exclude: false,
      fix_amount: false,
    },
  ];
  // schedules?.filter(
  //   (s) => s.event_name === eventName && s.price_type === priceType
  // ) ?? [];

  const pickDate = async () => {
    const newMonth = await openDayPeriodPicker(period.start, period.end);
    setPeriod(newMonth);
  };

  return {
    spendSchedules,
    saveSchedules,
    detailSchedules,
    detailSchedule: detailSchedules[0],
    eventName,
    category,
    templateCount,
    isPending,
    isError,
    options: ["All"].concat(yearOptions),
    startDate: period.start,
    endDate: period.end,
    pickDate,
    deleteTemplate,
  };
};

export default useRegularAsset;
