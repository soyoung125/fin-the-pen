import SummaryCard from "@pages/Home/next-components/HomeHeader/MonthlyBudgetSummary/SummaryCard";
import { Stack } from "@mui/material";
import React from "react";

interface MonthlySummaryProps {
  income: number;
  expense: number;
  isError: boolean;
}

function MonthlySummary({ isError, expense, income }: MonthlySummaryProps) {
  if (isError) {
    return (
      <Stack
        py={3}
        px={2.5}
        spacing="6px"
        bgcolor="primary.main"
        sx={{ color: "#FFF" }}
      >
        <SummaryCard title="수입" amount={0} />
        <SummaryCard title="지출" amount={0} />
      </Stack>
    );
  }

  return (
    <Stack
      py={3}
      px={2.5}
      spacing="6px"
      bgcolor="primary.main"
      sx={{ color: "#FFF" }}
    >
      <SummaryCard title="수입" amount={income} />
      <SummaryCard title="지출" amount={expense} />
    </Stack>
  );
}

export default MonthlySummary;
