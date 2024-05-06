import { Box, Stack } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

interface SelectDateTimeProps {
  paddingLeft?: boolean;
  dateTime: string;
  onClick: () => void;
}

function SelectDateTime({
  paddingLeft,
  dateTime,
  onClick,
}: SelectDateTimeProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft={paddingLeft ? 1 : 0}
      onClick={onClick}
      sx={{ height: "50px", borderBottom: "1px solid #F7F7F8", flexGrow: 1 }}
    >
      <Box>{dateTime}</Box>
      <ExpandMoreRoundedIcon color="primary" />
    </Stack>
  );
}

export default SelectDateTime;
