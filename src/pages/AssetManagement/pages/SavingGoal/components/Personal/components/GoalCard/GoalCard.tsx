import {
  GoalBody,
  GoalHeader,
} from "@pages/AssetManagement/pages/SavingGoal/components/Personal/components/GoalCard/GoalCard.styles.ts";
import { Stack, Typography, Box } from "@mui/material";

export interface GoalCardProps {
  title: string;
  subTitle: string;
  amount: number;
}

function GoalCard({ title, subTitle, amount }: GoalCardProps) {
  return (
    <Stack width="100%">
      <GoalHeader>{title}</GoalHeader>
      <GoalBody>
        <Stack spacing="13px">
          <Typography variant="subtitle2">{subTitle}</Typography>
          <Box
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "#735BF2",
            }}
          >
            {amount.toLocaleString()}원
          </Box>
        </Stack>
      </GoalBody>
    </Stack>
  );
}

export default GoalCard;
