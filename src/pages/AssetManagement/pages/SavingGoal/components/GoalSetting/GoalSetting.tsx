import { IconButton, Stack, Box } from "@mui/material";
import React from "react";
import IconSVG from "@components/common/IconSVG";

export interface GoalSettingProps {
  name?: string;
  handleModify: () => void;
}

function GoalSetting({ name, handleModify }: GoalSettingProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box sx={{ fontSize: "20px", fontWeight: 500 }}>
        <span style={{ fontSize: "20px", color: "#735BF2", fontWeight: 500 }}>
          {name}
        </span>
        님의 저축 목표 입니다.
      </Box>

      <IconButton color="primary" onClick={handleModify} sx={{ p: 0 }}>
        <IconSVG id={"filter-main"} size={24} />
      </IconButton>
    </Stack>
  );
}

export default GoalSetting;
