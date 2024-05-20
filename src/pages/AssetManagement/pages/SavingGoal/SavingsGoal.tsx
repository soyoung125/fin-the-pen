import { Box, Stack, Typography } from "@mui/material";
import Saving from "@pages/AssetManagement/pages/SavingGoal/components/Saving/Saving.tsx";
import Personal from "./components/Personal/Personal.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import useSavingGoal from "@hooks/assetManagement/useSavingGoal.ts";
import React from "react";

function SavingsGoal() {
  const { data: user } = useUser();
  const { goal, handleSetSavingGoal, handleSetPersonalGoal } = useSavingGoal();

  return (
    <Box px={2.5} pt={2.5}>
      <Stack justifyContent="space-between" spacing="7px">
        <Typography variant="h2">
          <span style={{ fontSize: "20px", color: "#735BF2", fontWeight: 500 }}>
            {user?.name}
          </span>
          님의 저축 목표 입니다.
        </Typography>

        <Typography variant="h2">
          {"오늘까지 총 "}
          <span style={{ fontSize: "20px", color: "#735BF2", fontWeight: 500 }}>
            900,000
          </span>
          {"원을 저축했어요."}
        </Typography>
      </Stack>

      <Saving
        saving={goal?.goal_amount}
        handleSetSavingGoal={handleSetSavingGoal}
      />

      {/*<Personal*/}
      {/*  personal={goal?.personal_goal}*/}
      {/*  handleSetPersonalGoal={handleSetPersonalGoal}*/}
      {/*/>*/}
    </Box>
  );
}

export default SavingsGoal;
