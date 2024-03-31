import { Box, Stack, Typography } from "@mui/material";
import {
  GoalHeader,
  GoalBody,
} from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/components/GoalCard/GoalCard.styles.ts";
import { ReactNode } from "react";

export interface GoalCardProps {
  title: string;
  start: ReactNode;
  end: ReactNode;
}

function GoalCard({ title, start, end }: GoalCardProps) {
  return (
    <Stack>
      <GoalHeader>{title}</GoalHeader>
      <GoalBody>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>{start}</Box>
          <Box>{end}</Box>
        </Stack>
      </GoalBody>
    </Stack>
  );
}

export default GoalCard;
