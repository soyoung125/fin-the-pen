import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { Box, Button } from "@mui/material";
import { useAppSelector } from "@redux/hooks.ts";
import { selectScheduleForm } from "@redux/slices/scheduleSlice.tsx";
import { ModifyTemplateSchedule } from "@app/types/template.ts";

interface ScheduleDrawerFooterProps {
  handleClick: (data: ModifyTemplateSchedule) => Promise<void>;
}

function TemplateModifyFooter({ handleClick }: ScheduleDrawerFooterProps) {
  const schedule = useAppSelector(selectScheduleForm);

  const handleSubmit = () => {
    handleClick({
      amount: schedule?.set_amount,
      payment_type: schedule?.payment_type,
      is_excluded: schedule?.exclusion ? "true" : "false",
      is_fixed: schedule?.fix_amount ? "true" : "false",
    });
  };

  return (
    <Box sx={{ mx: 2.5, mt: 1 }}>
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        {SCHEDULE_DRAWER.modify_schedule}
      </Button>
    </Box>
  );
}

export default TemplateModifyFooter;
