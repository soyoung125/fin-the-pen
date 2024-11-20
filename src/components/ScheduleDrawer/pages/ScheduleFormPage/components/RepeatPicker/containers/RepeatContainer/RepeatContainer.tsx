import AllDay from "./repeat/AllDay.tsx";
import Week from "./repeat/Week";
import Month from "./repeat/Month";
import Year from "./repeat/Year";
import { RepeatProps } from "@app/types/schedule.ts";
import RepeatRadioGroup from "./radio/RepeatRadioGroup.tsx";

interface RepeatContainerProps extends RepeatProps {
  handleChange: (value: string) => void;
  updateYearRepeat: (id: string, value: string) => void;
}

function RepeatContainer({
  repeatType,
  repeat,
  handleChange,
  handleChangeOption,
  updateYearRepeat,
}: RepeatContainerProps) {
  return (
    <RepeatRadioGroup value={repeatType} handleChange={handleChange}>
      <AllDay
        repeatType={repeatType}
        repeat={repeat}
        handleChangeOption={handleChangeOption}
      />

      <Week
        repeatType={repeatType}
        repeat={repeat}
        handleChangeOption={handleChangeOption}
      />

      <Month
        repeatType={repeatType}
        repeat={repeat}
        handleChangeOption={handleChangeOption}
      />

      <Year
        repeatType={repeatType}
        repeat={repeat}
        handleChangeOption={handleChangeOption}
        updateYearRepeat={updateYearRepeat}
      />
    </RepeatRadioGroup>
  );
}

export default RepeatContainer;
