import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import { Box, Button } from "@mui/material";

interface ScheduleDrawerFooterProps {
  handleClick: () => Promise<void>;
}

function TemplateModifyFooter({ handleClick }: ScheduleDrawerFooterProps) {
  return (
    <Box sx={{ mx: 2.5, mt: 1 }}>
      <Button variant="contained" fullWidth onClick={handleClick}>
        {SCHEDULE_DRAWER.modify_schedule}
      </Button>
    </Box>
  );
}

export default TemplateModifyFooter;
