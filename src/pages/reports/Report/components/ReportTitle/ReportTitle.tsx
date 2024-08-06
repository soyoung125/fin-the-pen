import { Stack, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export interface ReportTitleProps {
  year: number;
  month: number;
  amount: number;
  pickMonth?: () => void;
}

function ReportTitle({ amount, year, month, pickMonth }: ReportTitleProps) {
  return (
    <Stack spacing={0.5}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography fontSize="16px" alignItems={"center"}>
          {year}년 {month}월
        </Typography>
        <ArrowForwardIosRoundedIcon
          fontSize={"small"}
          color="secondary"
          onClick={pickMonth}
        />
      </Stack>
      <Typography fontSize="18px">
        오늘까지 총{" "}
        <span style={{ color: "#735BF2", fontWeight: 700 }}>
          {amount.toLocaleString()}
        </span>
        원 소비했어요
      </Typography>
    </Stack>
  );
}

export default ReportTitle;
