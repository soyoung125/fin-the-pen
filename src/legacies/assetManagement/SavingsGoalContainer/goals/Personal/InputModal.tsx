import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import ResetButton from "@components/common/ResetButton";
import {
  PersonalGoal,
  PersonalGoalForm,
  SetPersonalGoalQuery,
} from "@app/types/asset.ts";
import { getPersonalForm } from "@legacies/assetManagement/SavingsGoalContainer/utils.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

interface InputModalProps {
  closeModal: () => void;
  personal?: PersonalGoal;
  handleSetPersonalGoal: (data: SetPersonalGoalQuery) => void;
}

interface ChangePersonalGoal {
  (state: { target: { id: string; value: string } }): void;
}

function InputModal({
  closeModal,
  personal,
  handleSetPersonalGoal,
}: InputModalProps) {
  const { openConfirm } = useDialog();
  const [form, setForm] = useState<PersonalGoalForm>(getPersonalForm(personal));

  const changePersonalGoal: ChangePersonalGoal = (state) => {
    const { id, value } = state.target;
    if (id === "personal_goal" && value.length > 16) return;
    if (id === "goal_amount" && Number(value) > 10000000) return;

    setForm({ ...form, [state.target.id]: state.target.value });
  };

  const divisionByType = (money: number): number | string => {
    return Math.round(money / 12);
  };

  const handleReset = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "모든 정보를 초기화하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      setForm(getPersonalForm());
    }
  };

  return (
    <Stack p={2} spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ResetButton handleClick={handleReset} />
        <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
          나만의 저축 목표
        </Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ marginY: 1 }} />

      <Stack spacing={1}>
        {/* 목표 */}
        <FormControl fullWidth>
          <OutlinedInput
            id="personal_goal"
            startAdornment={
              <InputAdornment position="start">목표명</InputAdornment>
            }
            value={form.personal_goal}
            onChange={changePersonalGoal}
            size="small"
            inputProps={{
              style: { textAlign: "right" },
            }}
          />
        </FormControl>

        {/* 금액 */}
        <FormControl fullWidth>
          <OutlinedInput
            id="goal_amount"
            startAdornment={
              <InputAdornment position="start">금액</InputAdornment>
            }
            value={form.goal_amount.toLocaleString("ko-KR")}
            onChange={(e) =>
              changePersonalGoal({
                target: {
                  id: e.target.id,
                  value: e.target.value.replaceAll(",", ""),
                },
              })
            }
            size="small"
            inputProps={{
              style: { textAlign: "right" },
              step: 10,
            }}
            type="text"
            onFocus={(e) => e.target.select()}
          />
        </FormControl>

        {/* 기한 */}
        <TextField
          id="period"
          type="date"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">기간</InputAdornment>
            ),
          }}
          inputProps={{
            style: { textAlign: "right" },
          }}
          value={form.period}
          onChange={changePersonalGoal}
          size="small"
        />

        {/* 필요 적금 액 */}
        <FormControl fullWidth>
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">한 달 저축액</InputAdornment>
            }
            value={divisionByType(form.goal_amount).toLocaleString("ko-KR")}
            size="small"
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
          handleSetPersonalGoal({
            ...form,
            goal_amount: form.goal_amount.toString(),
            month_amount: divisionByType(form.goal_amount).toString(),
          });
          closeModal();
        }}
      >
        나만의 목표 설정하기
      </Button>
    </Stack>
  );
}

export default InputModal;
