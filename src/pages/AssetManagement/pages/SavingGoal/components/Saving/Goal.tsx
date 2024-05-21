import { Box, Stack } from "@mui/material";
import RoundedBorderBox from "@components/common/RoundedBorderBox.tsx";

interface GoalProps {
  title: string;
  amount: number;
}

function Goal({ title, amount }: GoalProps) {
  return (
    <Stack spacing={2}>
      <Box sx={{ typography: "h2" }}>{title}</Box>
      <RoundedBorderBox>
        <Box
          sx={{
            typography: "h4",
            color: "primary.main",
            textAlign: "end",
            p: 1.5,
          }}
        >
          {amount.toLocaleString()}원
        </Box>
      </RoundedBorderBox>
    </Stack>
  );
}

export default Goal;
