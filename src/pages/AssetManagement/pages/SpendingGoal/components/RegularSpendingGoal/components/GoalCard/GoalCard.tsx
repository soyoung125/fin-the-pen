import { Box, Stack, Typography } from "@mui/material";
import {
  GoalHeader,
  GoalBody,
} from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/GoalCard/GoalCard.styles.ts";
import { ReactNode } from "react";

export interface GoalCardProps {
  title: string;
  Icon?: ReactNode;
  start: ReactNode;
  end: ReactNode;
}

function GoalCard({ Icon, title, start, end }: GoalCardProps) {
  return (
    <Stack>
      <GoalHeader>{title}</GoalHeader>
      {Icon}
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
