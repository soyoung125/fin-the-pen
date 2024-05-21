import RoundedPaper from "@components/common/RoundedPaper.tsx";
import { Box, Stack, Typography } from "@mui/material";
import RoundedBorderBox from "@components/common/RoundedBorderBox.tsx";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import moment from "moment";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

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
      <RoundedPaper my={2}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          onClick={changeYearAndMonth}
          mb={3}
        >
          <Typography variant="h2">
            {moment(date).format("YYYY년 M월")}
          </Typography>
          <ArrowForwardIosRoundedIcon
            sx={{ color: "#8C919C" }}
            fontSize="small"
          />
        </Stack>

        <Box sx={{ typography: "h2", mb: 1 }}>지출 목표 금액</Box>

        <RoundedBorderBox>
          <Stack direction="row" justifyContent="space-between" p={1.5}>
            <Box
              sx={{
                typography: "caption",
                fontWeight: 500,
                color: "primary.main",
              }}
            >
              {getAmount(goal).toLocaleString()} 원
            </Box>

            <Box
              sx={{
                typography: "caption",
                fontWeight: 500,
                color: "#8C919C",
                textDecorationLine: "underline",
              }}
              onClick={handleModify}
            >
              금액설정
            </Box>
          </Stack>
        </RoundedBorderBox>

        {/*<Box sx={{ fontSize: "18px", fontWeight: "700" }} pb={1} pt={2}>*/}
        {/*  지출 금액*/}
        {/*</Box>*/}
        {/*{moment().isBefore(date, "month") ? (*/}
        {/*  <EmptySpendCard />*/}
        {/*) : (*/}
        {/*  <RoundedBorderBox>*/}
        {/*    <Box*/}
        {/*      sx={{*/}
        {/*        typography: "h6",*/}
        {/*        fontWeight: "bold",*/}
        {/*        color: "primary.main",*/}
        {/*        textAlign: "end",*/}
        {/*        p: 2,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {getAmount(spent).toLocaleString()}원*/}
        {/*    </Box>*/}
        {/*  </RoundedBorderBox>*/}
        {/*)}*/}
      </RoundedPaper>
  );
}

export default MonthSpendingGoal;
