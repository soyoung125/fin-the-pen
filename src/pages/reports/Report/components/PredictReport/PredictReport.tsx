import { Stack, Typography } from "@mui/material";
import {
  getAmount,
  LABELS,
  REPORTTYPE,
} from "@pages/reports/Report/components/PredictReport/utils.ts";
import DoughnutChart from "@pages/reports/Report/components/PredictReport/DoughnutChart";
import { getColors } from "@pages/reports/Report/components/PredictReport/DoughnutChart/utils.ts";
import * as React from "react";
import PredictReportCard from "@pages/reports/Report/components/PredictReport/PredictReportCard";
import EmptyPredictReport from "@pages/reports/Report/components/PredictReport/EmptyPredictReport.tsx";

export interface PredictReportProps {
  selected: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  month: number;
  goal: number;
  used: number;
  predict: number;
  useable: number;
}

function PredictReport({
  selected,
  setSelected,
  month,
  goal,
  used,
  predict,
  useable,
}: PredictReportProps) {
  const colors = getColors(selected);
  const datas = [used, predict, useable];

  if (datas.reduce((a, b) => a + b, 0) === 0)
    return <EmptyPredictReport month={month} />;

  return (
    <Stack spacing={3}>
      <Typography fontSize="18px">
        이번 달 지출 목표액{" "}
        <span style={{ color: "#735BF2", fontWeight: 700 }}>
          {getAmount(goal)}
        </span>
      </Typography>

      <DoughnutChart
        labels={LABELS}
        datas={datas}
        bgColors={colors}
        selected={selected}
        setSelected={setSelected}
      />

      <Stack>
        {REPORTTYPE.map((type, idx) => (
          <PredictReportCard
            key={idx}
            month={month}
            type={type}
            amount={datas[idx]}
            selected={selected === type.type}
            over={useable === 0}
            setSelected={setSelected}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default PredictReport;
