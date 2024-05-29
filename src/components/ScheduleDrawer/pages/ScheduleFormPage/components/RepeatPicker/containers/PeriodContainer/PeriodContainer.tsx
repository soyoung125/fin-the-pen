import EndDate from "./period/EndDate";
import RadioLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel";
import RepetitionCount from "./period/RepetitionCount.tsx";
import RepeatRadioGroup from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RepeatRadioGroup.tsx";
import { PeriodProps } from "@app/types/schedule.ts";

interface PeriodContainerProps extends PeriodProps {
  handleChange: (value: string) => void;
}

function PeriodContainer({
  periodType,
  handleChange,
  period,
  handleChangeOption,
}: PeriodContainerProps) {
  return (
    <RepeatRadioGroup value={periodType} handleChange={handleChange}>
      <RadioLabel value="is_repeat_again" label="계속 반복" />

      <RepetitionCount
        periodType={periodType}
        period={period}
        handleChangeOption={handleChangeOption}
      />

      <EndDate handleChangeOption={handleChangeOption} period={period} />
    </RepeatRadioGroup>
  );
}

export default PeriodContainer;
