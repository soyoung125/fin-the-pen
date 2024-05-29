import InputLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel/labels/InputLabel.tsx";
import { ScheduleRepeat } from "@app/types/schedule.ts";
import { UpdateStateInterface } from "@app/types/common.ts";

interface InputLabelProps {
  label: string;
  postInputLabel: string;
  max: number;
  option: "day" | "week" | "month" | "year";
  repeatType: string;
  repeat: ScheduleRepeat;
  updateRepeat: (state: UpdateStateInterface) => void;
}

function RepeatInputLabel({
  label,
  postInputLabel,
  max,
  option,
  repeatType,
  repeat,
  updateRepeat,
}: InputLabelProps) {
  const type = `${option}_type` as const;
  const repeatValue = repeat[type].repeat_term;

  const handleUpdate = (value: string) =>
    updateRepeat({ target: { id: "repeat_term", value: value } });

  return repeatType === option ? (
    <InputLabel
      value={repeatValue}
      handleUpdate={handleUpdate}
      postInputLabel={postInputLabel}
      max={max}
    />
  ) : (
    <>{label}</>
  );
}

export default RepeatInputLabel;
