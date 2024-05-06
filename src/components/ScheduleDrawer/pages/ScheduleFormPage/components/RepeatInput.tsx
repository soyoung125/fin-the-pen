import { Box, Stack } from "@mui/material";
import SwitchButton from "@components/common/SwitchButton.tsx";
import { UpdateStateInterface } from "@app/types/common.ts";
import { useScheduleForm } from "../../../hooks/useScheduleForm.ts";

interface RepeatInputProps {
  repeatType: string;
  onClick?: () => void;
  handleChange?: (value: string) => void;
}

function RepeatInput({ repeatType, onClick, handleChange }: RepeatInputProps) {
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
      <Stack direction="row" justifyContent="space-between" sx={{ px: 2.5 }}>
        <Box sx={{ flexGrow: 1, typography: "h2" }} onClick={onClick}>
          반복
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
