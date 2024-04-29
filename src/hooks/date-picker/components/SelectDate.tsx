import CalenderBox from "@hooks/date-picker/CalenderBox.tsx";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";

interface SelectDateProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function SelectDate({ value, setValue }: SelectDateProps) {
  return (
    <CalenderBox dateHeight={50} dateSize={32} week={6}>
      <DateCalendar
        views={["year", "month", "day"]}
        value={moment(value)}
        onChange={(newValue) => {
          setValue(newValue ? newValue.format("YYYY-MM-DD") : "");
        }}
      />
    </CalenderBox>
  );
}

export default SelectDate;
