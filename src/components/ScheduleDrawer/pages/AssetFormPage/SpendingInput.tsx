import {
  Box,
  FormControl,
  FormHelperText,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import SwitchButton from "@components/common/SwitchButton.tsx";
import { UpdateStateInterface } from "@app/types/common.ts";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

function SpendingInput() {
  const { scheduleForm, updateSchedule } = useScheduleForm();
  const { openConfirm } = useDialog();
  const expectedSpending = scheduleForm ? scheduleForm?.set_amount : "0";
  const [showError, setShowError] = useState(false);

  const changeAmount = (state: React.ChangeEvent<HTMLInputElement>) => {
    const amount = state.target.value.replaceAll(",", "");
    if (Number(amount) > 100000000 && !showError) {
      setShowError(true);
    } else if (Number(amount) <= 100000000 && showError) {
      setShowError(false);
    }
    updateSchedule({
      target: {
        id: "set_amount",
        value: state.target.value.replaceAll(",", ""),
      },
    });
  };

  const changeFixAmount = async (state: UpdateStateInterface) => {
    const answer =
      !scheduleForm?.fix_amount ||
      (await openConfirm({
        title: "알림",
        content: "금액 고정을 해제하시겠습니까?",
        approveText: "네",
        rejectText: "아니오",
      }));
    if (answer) {
      updateSchedule(state);
    }
  };

  return (
    <Stack px={2.5} pt={2}>
      <Box
        py={1.5}
        sx={{
          typography: "h2",
          color: "#131416",
          borderBottom: "1px solid #F7F7F8",
        }}
      >
        {SCHEDULE_DRAWER.set_spending_title}
      </Box>

      <Box py={1.5}>
        <FormControl fullWidth>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              borderRadius: "4px",
              border: "1px solid",
              borderColor: showError ? "error.main" : "primary.main",
              padding: "8px 12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                padding: "3px",
                borderRadius: 10,
                backgroundColor: "#735BF2",
                color: "white",
              }}
            >
              {scheduleForm?.price_type === "-" ? (
                <RemoveRoundedIcon fontSize="small" />
              ) : (
                <AddRoundedIcon fontSize="small" />
              )}
            </Box>
            <InputBase
              sx={{
                ml: 1,
                minWidth: "25px",
                width: `calc(${expectedSpending.length ?? 5} * 11px + 11px)`,
              }}
              id="expected_spending"
              value={
                expectedSpending === ""
                  ? "0"
                  : parseInt(expectedSpending, 10).toLocaleString("ko-KR")
              }
              onChange={changeAmount}
              endAdornment={SCHEDULE_DRAWER.won}
              inputProps={{
                style: { textAlign: "right" },
                inputMode: "numeric",
              }}
            />
          </Stack>
          <FormHelperText sx={{ ml: 0, color: "error.main" }}>
            {showError ? "입력 금액이 범위를 초과했습니다!" : ""}
          </FormHelperText>
        </FormControl>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={1}
      >
        <Typography variant="h2" color="#131416">
          {SCHEDULE_DRAWER.fix_amount}
        </Typography>
        <Stack direction="row" alignItems="center">
          <SwitchButton
            checked={scheduleForm?.fix_amount ?? false}
            handleChange={() =>
              changeFixAmount({
                target: {
                  id: "fix_amount",
                  value: !scheduleForm?.fix_amount,
                },
              })
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SpendingInput;
