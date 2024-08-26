import { useUser } from "@app/tanstack-query/useUser.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
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
  const { data, isPending, isError } = useTemplateByPriceType({
    user_id: user?.user_id ?? "",
  });
  const { deleteTemplate } = useDeleteTemplate();

  const yearOptions = Array.from(
    { length: moment(period.end).year() - moment(period.start).year() + 1 },
    (_, i) => (moment(period.start).year() + i).toString()
  );

  const spendSchedules = data?.deposit ?? [];

  const saveSchedules = data?.withdraw ?? [];

  const templateCount = spendSchedules.length + saveSchedules.length;

  const pickDate = async () => {
    const newMonth = await openDayPeriodPicker(period.start, period.end);
    setPeriod(newMonth);
  };

  return {
    spendSchedules,
    saveSchedules,
    eventName,
    category,
    templateCount,
    isPending,
    isError,
    options: ["All"].concat(yearOptions),
    startDate: period.start,
    endDate: period.end,
    pickDate,
    handleDelete: deleteTemplate,
  };
};

export default useRegularAsset;
