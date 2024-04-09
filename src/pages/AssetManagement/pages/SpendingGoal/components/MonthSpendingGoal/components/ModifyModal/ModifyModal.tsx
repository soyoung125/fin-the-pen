import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import reset from "@assets/icons/reset.svg";
import { useState } from "react";

export interface ModifyModalProps {
  month: string;
  value: number;
  closeModal: () => void;
  handleSubmit: (v: number) => void;
}

function ModifyModal({
  closeModal,
  handleSubmit,
  value,
  month,
}: ModifyModalProps) {
  const [newValue, setNewValue] = useState(value);
  const handleReset = () => setNewValue(0);
  return (
    <Stack p={2} spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton onClick={handleReset}>
          <img src={reset} alt="reset" width="24px" height="24px" />
        </IconButton>
        <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
          {`${month}월 지출 목표액`}
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ marginY: 1 }} />

      <FormControl fullWidth>
        <OutlinedInput
          id="goal_amount"
          endAdornment={<InputAdornment position="end">원</InputAdornment>}
          value={newValue.toLocaleString()}
          onChange={(e) =>
            setNewValue(parseInt(e.target.value.replaceAll(",", "")))
          }
          inputProps={{
            style: { textAlign: "right" },
            step: 10,
          }}
          type="text"
          onFocus={(e) => e.target.select()}
          color="primary"
        />
      </FormControl>

      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={closeModal}
        >
          취소
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleSubmit(newValue);
            closeModal();
          }}
        >
          설정
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyModal;
