import { Box, Stack } from "@mui/material";
import SwitchButton from "@components/common/SwitchButton.tsx";
import { UpdateStateInterface } from "@app/types/common.ts";
import { useScheduleForm } from "../../../hooks/useScheduleForm.ts";

interface RepeatInputProps {
  repeatType: string;
  onClick?: () => void;
  handleChange?: (value: string) => void;
  repeatTitle?: string;
}

function RepeatInput({
  repeatType,
  onClick,
  handleChange,
  repeatTitle,
}: RepeatInputProps) {
  const { updateRepeat } = useScheduleForm();

  const changeRepeat = (state: UpdateStateInterface) => {
    handleChange
      ? handleChange(state.target.value as string)
      : updateRepeat(state);
    if (onClick && state.target.value !== "none") {
      onClick();
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="end" sx={{ px: 2.5 }}>
        <Box sx={{ typography: "h2" }} onClick={onClick}>
          반복
        </Box>
        <Box
          sx={{ flexGrow: 1, typography: "subtitle2", color: "primary.main" }}
          onClick={onClick}
        >
          {repeatTitle}
        </Box>
        <SwitchButton
          checked={repeatType !== "none"}
          handleChange={() =>
            changeRepeat({
              target: {
                value: repeatType === "none" ? "day" : "none",
                id: "repeat",
              },
            })
          }
        />
      </Stack>
    </Box>
  );
}

export default RepeatInput;
