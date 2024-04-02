import {
  Box,
  InputBase,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { TimeState } from "@hooks/date-picker/components/TimePicker.tsx";

interface SelectTimeProps {
  timeState: TimeState;
  setValue: (type: keyof TimeState, value: TimeState[keyof TimeState]) => void;
}

function SelectTime({ timeState, setValue }: SelectTimeProps) {
  const { meridiem, minute, hour } = timeState;
  const updateHour = (value: string) => {
    const numberValue = Number(value.replace(/\D/g, ""));
    if (numberValue < 0 || numberValue > 12) return;
    setValue("hour", numberValue);
  };

  const updateMinute = (value: string) => {
    const numberValue = Number(value.replace(/\D/g, ""));
    if (numberValue < 0 || numberValue > 59) return;
    setValue("minute", numberValue);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap="8px"
      alignItems="stretch"
    >
      <ToggleButtonGroup
        color="primary"
        orientation="vertical"
        value={meridiem}
        exclusive
        size="small"
        sx={{ flexGrow: 1 }}
        onChange={(e, newAlignment) =>
          newAlignment && setValue("meridiem", newAlignment)
        }
      >
        <ToggleButton value="오전">오전</ToggleButton>
        <ToggleButton value="오후">오후</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="row" alignItems="center" gap={1} width="70%">
        <Box
          sx={{
            height: "100%",
            border: "1px solid #C8CBD0",
            borderRadius: "4px",
            display: "flex",
          }}
        >
          <InputBase
            value={hour}
            onChange={(e) => updateHour(e.target.value)}
            sx={{
              my: "auto",
            }}
            inputProps={{
              style: { textAlign: "center", fontSize: "24px", fontWeight: 500 },
            }}
          />
        </Box>
        <Typography>:</Typography>
        <Box
          sx={{
            height: "100%",
            border: "1px solid #C8CBD0",
            borderRadius: "4px",
            display: "flex",
          }}
        >
          <InputBase
            value={minute}
            onChange={(e) => updateMinute(e.target.value)}
            sx={{
              my: "auto",
            }}
            inputProps={{
              style: { textAlign: "center", fontSize: "24px", fontWeight: 500 },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default SelectTime;
