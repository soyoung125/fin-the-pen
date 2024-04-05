import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { setSavingGoal } from "@redux/slices/assetSlice.tsx";
import { useAppDispatch } from "@redux/hooks.ts";
import ResetButton from "@components/common/ResetButton.tsx";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { MonthSavingGoal } from "@app/types/asset.ts";
import { getAmount } from "@pages/AssetManagement/pages/SavingGoal/utils.ts";

interface InputModalProps {
  closeSavingGoalModal: () => void;
  saving?: MonthSavingGoal;
  handleSetSavingGoal: (amount: number) => void;
}

function InputModal({
  closeSavingGoalModal,
  saving,
  handleSetSavingGoal,
}: InputModalProps) {
  const [form, setForm] = useState({
    year: getAmount(saving?.years_goal_amount),
    month: getAmount(saving?.months_goal_amount),
  });
  const { openConfirm } = useDialog();

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

  /**
   * redux에 이미 저장된 목표 값 불러오기
   */
  const dispatch = useAppDispatch();

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
    <Stack p={2} spacing={1} sx={{ minWidth: "320px" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ResetButton handleClick={handleReset} />
        <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
          저축 목표 설정
        </Typography>
        <IconButton onClick={() => closeSavingGoalModal()}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ marginY: 1 }} />

      <Stack spacing={1}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          한 해 저축 목표
        </Typography>
        <TextField
          fullWidth
          placeholder="한해동안의 저축 목표액을 입력하세요"
          type="text"
          value={form.year !== 0 ? form.year.toLocaleString("ko-KR") : ""}
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
            value={form.month !== 0 ? form.month.toLocaleString("ko-KR") : ""}
            onFocus={(e) => e.target.select()}
            onChange={handleChange}
            id="month"
            inputProps={{
              style: { textAlign: "right" },
            }}
          />
        </FormControl>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          dispatch(setSavingGoal(form));
          handleSetSavingGoal(form.year);
          closeSavingGoalModal();
        }}
      >
        완료
      </Button>
    </Stack>
  );
}

export default InputModal;
