import { useState } from "react";
import {
  getRepeatEndDate,
  useScheduleForm,
} from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import { INIT_PERIOD, INIT_REPEAT } from "@constants/schedule.ts";
import moment from "moment";
import { UpdateStateInterface } from "@app/types/common.ts";
import { repeatKindType } from "@app/types/schedule.ts";

export const useCategoryPicker = () => {
  const { scheduleForm, updateRepeatAndPeriod } = useScheduleForm();

  const [repeatForm, setRepeat] = useState(
    scheduleForm?.repeat ?? INIT_REPEAT(moment())
  );
  const [periodForm, setPeriod] = useState(
    scheduleForm?.period ?? INIT_PERIOD(moment())
  );

  const repeatType = repeatForm.kind_type ?? "day";
  const periodType = periodForm.kind_type ?? "is_repeat_again";

  const getRepeat = () => {
    const type = { day: "일", week: "주", month: "달", year: "년" };
    const repeatType = repeatForm.kind_type;

    if (repeatType === "none") return "";

    const term = repeatForm[`${repeatType}_type`].repeat_term;
    const repeat = `${term}${type[repeatType]}마다`;
    switch (periodForm.kind_type) {
      case "is_repeat_again":
        return `${repeat} 반복`;
      case "repeat_number_time":
        return `${repeat} ${periodForm.repeat_number_time}회 반복`;
      case "repeat_end_line":
        return `${repeat} ${periodForm.repeat_end_line}까지 반복`;
    }
  };

  const updateRepeat = (state: UpdateStateInterface) => {
    const { id, value } = state.target;
    if (id === "repeat") {
      const newPeriod = {
        ...periodForm,
        repeat_end_line: getRepeatEndDate(
          scheduleForm?.start_date,
          value as string
        ),
      };
      setRepeat({
        ...repeatForm,
        kind_type: value as repeatKindType,
      });
      setPeriod(newPeriod);
      return;
    }

    const type = repeatForm.kind_type;
    if (type !== "none") {
      const kind_type = `${type}_type` as const;
      const newValue = {
        ...repeatForm[kind_type],
        [id]: value,
      };
      console.log({
        ...repeatForm,
        [kind_type]: newValue,
      });
      setRepeat({
        ...repeatForm,
        [kind_type]: newValue,
      });
    }
  };

  const updatePeriod = (state: UpdateStateInterface) => {
    const { id, value } = state.target;
    if (id === "period") {
      setPeriod({
        ...periodForm,
        is_repeat_again: value === "is_repeat_again",
        kind_type: value as string,
      });
      return;
    }

    const type = periodForm.kind_type ?? "";
    if (type !== "") {
      setPeriod({
        ...periodForm,
        [type]: value,
      });
    }
  };

  const saveRepeat = () => updateRepeatAndPeriod(repeatForm, periodForm);

  return {
    repeat: repeatForm,
    repeatType,
    period: periodForm,
    periodType,
    updateRepeat,
    updatePeriod,
    getRepeat,
    saveRepeat,
  };
};
