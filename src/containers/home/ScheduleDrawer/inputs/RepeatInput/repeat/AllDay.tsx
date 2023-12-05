import { selectSchedule } from "@app/redux/slices/scheduleSlice";
import RadioButton from "@components/common/RadioButton";
import { FormControlLabel, Input } from "@mui/material";
import { useSelector } from "react-redux";

function AllDay() {
  const schedule = useSelector(selectSchedule);

  return (
    <FormControlLabel
      control={<RadioButton value="AllDay" />}
      label={
        schedule?.repeat === "AllDay" ? (
          <>
            <Input
              defaultValue={1}
              type="number"
              inputProps={{
                min: 1,
                max: 365,
              }}
              sx={{ width: "30px" }}
            />
            일 마다
          </>
        ) : (
          <>매일</>
        )
      }
      sx={{ px: 2.5 }}
    />
  );
}

export default AllDay;