import RoundedPaper from "@components/common/RoundedPaper.tsx";
import { Box, IconButton, Stack } from "@mui/material";
import filter_main from "@assets/icons/header/filter_main.svg";
import { getAmount } from "@legacies/assetManagement/SavingsGoalContainer/utils.ts";
import GoalCard from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/components/GoalCard";
import { Highlight } from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/RegularSpendingGoal.styles.ts";

export interface RegularSpendingGoalProps {
  handleModify: () => void;
  goal: string;
  startDate: string;
  endDate: string;
}

function RegularSpendingGoal({
  handleModify,
  goal,
  startDate,
  endDate,
}: RegularSpendingGoalProps) {
  return (
    <Box mt="30px">
      <RoundedPaper my={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={"17px"}
        >
          <Box sx={{ fontSize: "18px", fontWeight: "700" }}>
            정기 지출 목표액
          </Box>
          <IconButton color="primary" onClick={handleModify}>
            <img src={filter_main} alt="filter" />
          </IconButton>
        </Stack>

        <Stack spacing="25px">
          <GoalCard
            title={"지출 목표액"}
            start={<>한달 기준</>}
            end={
              <Stack direction="row" spacing={1} alignItems="center">
                <Highlight>{getAmount(goal)}</Highlight>
                <Box>원</Box>
              </Stack>
            }
          />
          <GoalCard
            title={"기간"}
            start={
              <Stack direction="row" spacing={1} alignItems="center">
                <Highlight>{startDate}</Highlight>
                <Box>부터</Box>
              </Stack>
            }
            end={
              <Stack direction="row" spacing={1} alignItems="center">
                <Highlight>{endDate}</Highlight>
                <Box>까지</Box>
              </Stack>
            }
          />
        </Stack>
      </RoundedPaper>
    </Box>
  );
}

export default RegularSpendingGoal;
