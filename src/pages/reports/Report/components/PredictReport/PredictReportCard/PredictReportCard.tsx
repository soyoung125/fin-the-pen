import { Box, Stack, Typography } from "@mui/material";
import {
  getAmount,
  ReportTypeInterface,
} from "@pages/reports/Report/components/PredictReport/utils.ts";
import * as React from "react";

export interface PredictReportCardProps {
  month: number;
  type: ReportTypeInterface;
  amount: number;
  selected: boolean;
  over: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
}

function PredictReportCard({
  month,
  type,
  amount,
  selected,
  over,
  setSelected,
}: PredictReportCardProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      py="11px"
      sx={{ opacity: selected ? 1 : 0.3 }}
      onClick={() => setSelected && setSelected(type.type)}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Box
          width={12}
          height={12}
          borderRadius={100}
          border={3}
          sx={{ color: type.color }}
        />
        <Typography variant="subtitle1">
          {over && type.overTitle ? type.overTitle : `${month}${type.title}`}
        </Typography>
      </Stack>

      <Typography
        color={over && type.overTitle ? "error" : "inherit"}
        variant="subtitle2"
      >
        {getAmount(amount)}
      </Typography>
    </Stack>
  );
}

export default PredictReportCard;
