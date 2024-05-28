import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Stack,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import ResetButton from "@components/common/ResetButton.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

export interface SettingDrawerProps {
  closeDrawer: () => void;
  yearAmount: number;
  monthAmount: number;
  handleSubmit: (amount: number) => void;
}

function SettingDrawer({
  yearAmount,
  monthAmount,
  closeDrawer,
  handleSubmit,
}: SettingDrawerProps) {
  const { openConfirm } = useDialog();

  const [form, setForm] = useState({
    year: yearAmount,
    month: monthAmount,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    const newValue = parseInt(value.replaceAll(",", ""), 10);
    if (newValue >= 0) {
      setForm({
        ...form,
        year: id === "year" ? newValue : newValue * 12,
        month: id === "year" ? Math.round(newValue / 12) : newValue,
      });
    } else {
      alert("숫자는 0 이하일 수 없습니다.");
    }
  };

  const handleReset = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "모든 정보를 초기화하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      setForm({
        year: 0,
        month: 0,
      });
    }
  };

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={2.5}
        py={1.5}
      >
        <ResetButton handleClick={handleReset} />
        <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
          저축 목표 설정
        </Typography>
        <IconButton onClick={closeDrawer}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ marginY: 1 }} />

      <Stack spacing={1.5} flexGrow={1} px={2.5}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          한 해 저축 목표
        </Typography>
        <TextField
          fullWidth
          placeholder="한해동안의 저축 목표액을 입력하세요"
          type="text"
          value={form.year.toLocaleString("ko-KR")}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          id="year"
          inputProps={{
            style: { textAlign: "right" },
          }}
        />
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          월 저축 목표
        </Typography>
        <FormControl fullWidth>
          <TextField
            placeholder="한해 저축 목표액을 입력하면 한달 저축 목표금액이 표시됩니다."
            type="text"
            value={form.month.toLocaleString("ko-KR")}
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            id="month"
            inputProps={{
              style: { textAlign: "right" },
            }}
          />
        </FormControl>
        <Typography fontSize="12px" fontWeight={600} color="primary">
          * 한해 저축 목표액을 입력하면 한달 저축 목표금액이 표시됩니다.
        </Typography>
      </Stack>

      <Box px={2.5} pt={1} pb={3.5} borderTop="1px solid #DEE0E3">
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleSubmit(form.year)}
        >
          완료
        </Button>
      </Box>
    </Stack>
  );
}

export default SettingDrawer;
