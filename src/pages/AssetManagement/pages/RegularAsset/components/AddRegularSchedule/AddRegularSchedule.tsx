import { Box, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export interface AddRegularScheduleProps {
  navigateTo: () => void;
}

function AddRegularSchedule({ navigateTo }: AddRegularScheduleProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      px={2.5}
      py="22px"
      onClick={navigateTo}
      borderBottom="1px solid #F7F7F8"
    >
      <Box
        display={"flex"}
        p="6px"
        borderRadius={2}
        bgcolor="#C8CBD0"
        color="#FFF"
      >
        <AddRoundedIcon fontSize="small" />
      </Box>
      <Typography variant="h5">정기 일정 추가</Typography>
    </Stack>
  );
}

export default AddRegularSchedule;
