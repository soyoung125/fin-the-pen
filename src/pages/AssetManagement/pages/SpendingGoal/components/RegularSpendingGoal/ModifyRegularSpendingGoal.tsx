import { Box, Button, Stack } from "@mui/material";
import GoalCard from "pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/GoalCard";
import {
  Highlight,
  HighLightInput,
} from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.styles.ts";
import React, { ChangeEvent, useState } from "react";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import { useDatePicker } from "@hooks/date-picker/hooks/useDatePicker.tsx";
import IconSVG from "@components/common/IconSVG";

export interface ModifyRegularSpendingGoalProps {
  goal: string;
  startDate: string;
  endDate: string;
  closeModify: () => void;
  handleSubmit: (form: Form) => void;
}

export interface Form {
  spend_goal_amount: string;
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
    spend_goal_amount: goal,
    start_date: startDate,
    end_date: endDate,
  });
  const handleChange = (state: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [state.target.id]: state.target.value.replaceAll(",", ""),
    });
  };

  const handleChangePeriod = async () => {
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
              id="spend_goal_amount"
              onChange={handleChange}
              value={getAmount(form.spend_goal_amount).toLocaleString()}
              inputMode="numeric"
            />
            <Box>원</Box>
          </Stack>
        }
      />
      <GoalCard
        title={"기간"}
        Icon={
          <Box pt={1.5} onClick={handleChangePeriod}>
            <IconSVG id={"calendar-primary"} size={20} />
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
          onClick={() => handleSubmit(form)}
        >
          설정
        </Button>
      </Stack>
    </Stack>
  );
}

export default ModifyRegularSpendingGoal;
