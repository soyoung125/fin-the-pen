import RoundedPaper from "@components/common/RoundedPaper.tsx";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import filter_main from "@assets/icons/header/filter_main.svg";
import RoundedBorderBox from "@components/common/RoundedBorderBox.tsx";
import { getAmount } from "@legacies/assetManagement/SavingsGoalContainer/utils.ts";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export interface MonthSpendingGoalProps {
  date: string;
  changeYearAndMonth: () => void;
  handleModify: () => void;
  goal: string;
  spent: string;
}

function MonthSpendingGoal({
  date,
  changeYearAndMonth,
  handleModify,
  goal,
  spent,
}: MonthSpendingGoalProps) {
  return (
    <Box mt="30px">
      <RoundedPaper my={2}>
        <Stack
          direction="row"
          alignItems="center"
          onClick={changeYearAndMonth}
          mb={3}
        >
          <Typography variant="h2">{date}</Typography>
          <ExpandMoreRoundedIcon />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box sx={{ fontSize: "18px", fontWeight: "700" }}>지출 목표 금액</Box>
          <IconButton color="primary" onClick={handleModify} sx={{ p: 0 }}>
            <img src={filter_main} alt="filter" />
          </IconButton>
        </Stack>
        <RoundedBorderBox>
          <Box
            sx={{
              typography: "h6",
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "end",
              p: 2,
            }}
          >
            {getAmount(goal).toLocaleString()}원
          </Box>
        </RoundedBorderBox>

        <Box sx={{ fontSize: "18px", fontWeight: "700" }} pb={1} pt={2}>
          지출 금액
        </Box>
        <RoundedBorderBox>
          <Box
            sx={{
              typography: "h6",
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "end",
              p: 2,
            }}
          >
            {getAmount(spent).toLocaleString()}원
          </Box>
        </RoundedBorderBox>
      </RoundedPaper>
    </Box>
  );
}

export default MonthSpendingGoal;
