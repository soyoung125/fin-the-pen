import { Box, Stack } from "@mui/material";
import RoundedPaper from "../../../../../../components/common/RoundedPaper.tsx";
import { MonthSavingGoal } from "@app/types/asset.ts";
import { getAmount } from "@pages/AssetManagement/utils.ts";
import Goal from "@pages/AssetManagement/pages/SavingGoal/components/Saving/Goal.tsx";

interface SavingProps {
  saving?: MonthSavingGoal;
  handleSetSavingGoal: (amount: number) => void;
}

function Saving({ saving }: SavingProps) {
  return (
    <Box mt="30px">
      <RoundedPaper>
        <Stack spacing="26px">
          <Goal
            title={"한 해 저축 목표"}
            amount={getAmount(saving?.years_goal_amount)}
          />
          <Goal
            title={"월 저축 목표"}
            amount={getAmount(saving?.months_goal_amount)}
          />
        </Stack>
      </RoundedPaper>
    </Box>
  );
}

export default Saving;
