import { Stack, Typography } from "@mui/material";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import SwitchButton from "@components/common/SwitchButton.tsx";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";

function ExclusionInput() {
  const { scheduleForm, updateExclusion } = useScheduleForm();
  const exclusion = Boolean(scheduleForm?.exclusion);

  const changeExclusion = () => {
    updateExclusion(!exclusion);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2.5}
      py={1}
    >
      <Typography variant="h2" color="#131416">
        {SCHEDULE_DRAWER.exclusion_title}
      </Typography>
      <Stack direction="row" alignItems="center">
        <SwitchButton checked={exclusion} handleChange={changeExclusion} />
      </Stack>
    </Stack>
  );
}

export default ExclusionInput;
