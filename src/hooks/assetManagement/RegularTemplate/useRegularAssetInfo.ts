import { useUser } from "@app/tanstack-query/useUser.ts";
import { useState } from "react";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import moment from "moment";
import { Schedule } from "@app/types/schedule.ts";
import { useParams } from "react-router-dom";
import { useTemplateByPriceType } from "@app/tanstack-query/templates/useTemplateByPriceType.ts";
import { useDeleteTemplate } from "@app/tanstack-query/templates/useDeleteTemplate.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { useTemplateSchedules } from "@app/tanstack-query/templates/useTemplateSchedules.ts";

const useRegularAssetInfo = () => {
  const today = moment();
  const [period, setPeriod] = useState({
    start: today.startOf("year").format("YYYY-MM-DD"),
    end: today.endOf("year").format("YYYY-MM-DD"),
  });

  const { openDayPeriodPicker } = useDatePicker();
  const { template_id } = useParams();

  const { data: user } = useUser();
  const { data: schedules, isPending } = useTemplateSchedules({
    user_id: user?.user_id ?? "",
    template_id: template_id ?? "",
  });
  const { deleteTemplate } = useDeleteTemplate();

  const yearOptions = Array.from(
    { length: moment(period.end).year() - moment(period.start).year() + 1 },
    (_, i) => (moment(period.start).year() + i).toString()
  );
  const options = ["All"].concat(yearOptions);

  const template = schedules?.template;

  const templateCount = schedules?.schedule.length ?? 0;

  const detailSchedules: Schedule[] = schedules?.schedule ?? [];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChangeOption = (option: string) => {
    setSelectedOption(option);
  };
  const pickDate = async () => {
    const newMonth = await openDayPeriodPicker(period.start, period.end);
    setPeriod(newMonth);
  };

  return {
    detailSchedules,
    detailSchedule: detailSchedules[0],
    template,
    templateCount,
    isPending,
    options,
    selectedOption,
    startDate: period.start,
    endDate: period.end,
    pickDate,
    handleDelete: deleteTemplate,
    handleChangeOption,
  };
};

export default useRegularAssetInfo;
