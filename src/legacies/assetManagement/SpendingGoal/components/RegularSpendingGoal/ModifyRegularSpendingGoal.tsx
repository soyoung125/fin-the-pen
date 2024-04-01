import { Box, Button, InputBase, Stack } from "@mui/material";
import GoalCard from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/components/GoalCard";
import {
  Highlight,
  HighLightInput,
} from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.styles.ts";
import { ChangeEvent, useState } from "react";
import calendar_primary from "@assets/icons/bottom/calendar_primary.svg";
import { getAmount } from "@legacies/assetManagement/SavingsGoalContainer/utils.ts";
import moment from "moment/moment";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";

export interface ModifyRegularSpendingGoalProps {
  goal: string;
  startDate: string;
  endDate: string;
  closeModify: () => void;
  handleSubmit: (form: Form) => void;
}

export interface Form {
  goal: string;
  start_date: string;
  end_date: string;
}

function ModifyRegularSpendingGoal({
  goal,
  startDate,
  endDate,
  closeModify,
  handleSubmit,
}: ModifyRegularSpendingGoalProps) {
  const { openMonthPeriodPicker } = useDatePicker();
  const [form, setForm] = useState({
    goal: goal,
    start_date: startDate,
    end_date: endDate,
  });
  const handleChange = (state: ChangeEvent<HTMLInputElement>) => {
    console.log(state.target.value.replaceAll(",", ""));
    setForm({
      ...form,
      [state.target.id]: state.target.value.replaceAll(",", ""),
    });
  };

  const handleChandlePeriod = async () => {
    const newDate = await openMonthPeriodPicker(form.start_date, form.end_date);
    if (!newDate) return;
    setForm({
      ...form,
      start_date: newDate.start,
      end_date: newDate.end,
    });
  };

  return (
    <Stack spacing="25px">
      <GoalCard
        title={"지출 목표액"}
        start={<>한달 기준</>}
        end={
          <Stack direction="row" spacing={1} alignItems="center">
            <HighLightInput
              id="goal"
              onChange={handleChange}
              value={getAmount(form.goal).toLocaleString()}
            />
            <Box>원</Box>
          </Stack>
        }
      />
      <GoalCard
        title={"기간"}
        Icon={
          <Box pt={1.5} onClick={handleChandlePeriod}>
            <img
              src={calendar_primary}
              alt="calendar_primary"
              width={20}
              height={20}
            />
          </Box>
        }
        start={
          <Stack direction="row" spacing={1} alignItems="center">
            <Highlight>{form.start_date}</Highlight>
            <Box>부터</Box>
          </Stack>
        }
        end={
          <Stack direction="row" spacing={1} alignItems="center">
            <Highlight>{form.end_date}</Highlight>
            <Box>까지</Box>
          </Stack>
        }
      />

      <Stack direction="row" spacing={1}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={closeModify}
        >
          취소
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleSubmit(form);
            closeModify();
          }}
        >
          설정
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyRegularSpendingGoal;
