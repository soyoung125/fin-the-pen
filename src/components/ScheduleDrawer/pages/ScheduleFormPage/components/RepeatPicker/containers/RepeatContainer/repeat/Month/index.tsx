import RadioLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel";
import Option from "./Option.tsx";
import { RepeatProps } from "@app/types/schedule.ts";
import RepeatInputLabel from "../RepeatInputLabel.tsx";

function Month({ repeatType, handleChangeOption, repeat }: RepeatProps) {
  return (
    <>
      <RadioLabel
        value="month"
        label={
          <RepeatInputLabel
            label="매달"
            postInputLabel="개월 마다"
            max={12}
            option="month"
            repeatType={repeatType}
            repeat={repeat}
            updateRepeat={handleChangeOption}
          />
        }
      />

      {repeatType === "month" && (
        <Option handleChangeOption={handleChangeOption} repeat={repeat} />
      )}
    </>
  );
}

export default Month;
