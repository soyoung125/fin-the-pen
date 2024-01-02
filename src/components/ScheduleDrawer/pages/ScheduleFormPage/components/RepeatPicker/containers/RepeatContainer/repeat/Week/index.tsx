import RadioLabel from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/RepeatPicker/containers/RepeatContainer/radio/RadioLabel";
import Option from "./Option.tsx";
import { RepeatProps } from "@type/schedule.tsx";
import RepeatInputLabel from "../RepeatInputLabel.tsx";

function Week({ repeatType, handleChangeOption }: RepeatProps) {
  const changeDayOfWeek = (week: string) => {
    handleChangeOption({ target: { id: "repeat_day_of_week", value: week } });
  };

  return (
    <>
      <RadioLabel
        value="week"
        label={
          <RepeatInputLabel
            label="매주"
            postInputLabel="주 마다"
            max={52}
            option="week"
            repeatType={repeatType}
          />
        }
      />

      {repeatType === "week" && <Option changeDayOfWeek={changeDayOfWeek} />}
    </>
  );
}

export default Week;
