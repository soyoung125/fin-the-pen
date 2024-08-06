import { Box, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LineChart from "@pages/reports/Report/components/MonthlyReport/LineChart";
import moment from "moment";

export interface MonthlyReportProps {
  month: number;
  spending: number;
  previousSpending: number;
  twoMonthsAgoSpending: number;
}

function MonthlyReport({
  month,
  spending,
  previousSpending,
  twoMonthsAgoSpending,
}: MonthlyReportProps) {
  const difference = spending - previousSpending;
  const labels = Array.from({ length: 3 }, (_, i) =>
    moment(month, "M").subtract(i, "month").format("M월")
  ).reverse();
  const datas = [twoMonthsAgoSpending, previousSpending, spending];

  return (
    <>
      <Typography variant="subtitle2">최근 3개월간 소비 리포트</Typography>
      <Stack direction="row" alignItems="center" mt={0.5} mb={1}>
        <Typography variant="subtitle2">{labels[1]}대비</Typography>
        {difference < 0 ? (
          <ArrowDropDownIcon color="info" />
        ) : (
          <ArrowDropUpIcon color="error" />
        )}
        <Box
          sx={{
            backgroundColor: "#F5F4FF",
            color: "primary.main",
            borderRadius: "999px",
            paddingX: "8px",
            paddingY: "2px",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          {difference > 0 && "+"}
          {difference.toLocaleString()}원
        </Box>
      </Stack>

      <Box height={160}>
        <LineChart labels={labels} datas={datas} />
      </Box>
    </>
  );
}

export default MonthlyReport;
