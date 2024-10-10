import { Stack, Typography } from "@mui/material";
import BarChart from "@components/BarChart/BarChart.tsx";
import { useState } from "react";
import {
  getColors,
  getData,
  getTitle,
} from "@pages/reports/ReportCategoryDetails/utils.ts";
import { getSelectedType } from "@pages/reports/ReportCategoryDetails/components/ReportCategorySummary/utils.ts";

export interface ReportCategorySummaryProps {
  category: string;
  expect: number;
  amount: number;
  goal: number;
  balance: number;
}

function ReportCategorySummary({
  category,
  expect,
  amount,
  goal,
  balance,
}: ReportCategorySummaryProps) {
  const [selected, setSelected] = useState("used");
  const values = ["used", "predict", "useable"];
  const colors = getColors(selected);
  const data = getData(goal, amount, expect, balance);

  return (
    <Stack py={3} px={2} spacing={2.5}>
      <Stack px={1} direction="row" justifyContent="space-between">
        <Typography fontSize="20px" fontWeight={500}>
          {category}
        </Typography>
        <Typography variant="h2">{amount.toLocaleString()}원 사용</Typography>
      </Stack>

      <Stack spacing={0.5}>
        <BarChart
          values={values}
          data={data}
          colors={colors}
          titles={values.map((v) => getTitle(v))}
          selected={selected}
          setSelected={setSelected}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={400}>
            {`${getSelectedType(selected)} ${amount.toLocaleString()}원`}
          </Typography>
          <Typography color="secondary.dark">
            목표 {goal.toLocaleString()}원
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ReportCategorySummary;
