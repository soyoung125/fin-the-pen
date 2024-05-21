import { Stack, Box } from "@mui/material";
import Saving from "@pages/AssetManagement/pages/SavingGoal/components/Saving/Saving.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import useSavingGoal from "@hooks/assetManagement/useSavingGoal.ts";
import React from "react";
import GoalSetting from "@pages/AssetManagement/pages/SavingGoal/components/GoalSetting/GoalSetting.tsx";
import { useSettingGoalDrawer } from "@pages/AssetManagement/pages/SavingGoal/components/GoalSetting/SettingDrawer/useSettingDrawer.tsx";
import { TotalSavingCard } from "@pages/AssetManagement/pages/SavingGoal/SavingGoal.styles.ts";

function SavingsGoal() {
  const { data: user } = useUser();
  const { goal, handleSetSavingGoal } = useSavingGoal();

  const { openSettingGaolDrawer } = useSettingGoalDrawer();

  const handleModify = () => {
    openSettingGaolDrawer(goal?.goal_amount);
  };

  return (
    <Stack px={2.5} pt={2.5} spacing={2.5}>
      <Box>
        <TotalSavingCard>
          {"오늘까지 총 "}
          <span style={{ fontSize: "18px", color: "#735BF2", fontWeight: 500 }}>
            900,000
          </span>
          {"원을 저축했어요."}
        </TotalSavingCard>
      </Box>

      <GoalSetting name={user?.name} handleModify={handleModify} />

      <Saving
        saving={goal?.goal_amount}
        handleSetSavingGoal={handleSetSavingGoal}
      />

      {/*<Personal*/}
      {/*  personal={goal?.personal_goal}*/}
      {/*  handleSetPersonalGoal={handleSetPersonalGoal}*/}
      {/*/>*/}
    </Stack>
  );
}

export default SavingsGoal;
