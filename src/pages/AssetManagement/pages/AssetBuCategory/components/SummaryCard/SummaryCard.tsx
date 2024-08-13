import { Box, Stack, Typography } from "@mui/material";
import { RoundedCard } from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard/SummaryCard.styles.ts";
import BarChart from "@components/BarChart";
import React, { useState } from "react";
import {
  getColors,
  getData,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard/utils.ts";
import IconSVG from "@components/common/IconSVG";

export interface SummaryCardProps {
  used: number;
  goal: number;
  ratio: number;
  handleSetting: () => void;
}

function SummaryCard({ ratio, used, goal, handleSetting }: SummaryCardProps) {
  const [selected, setSelected] = useState("total");

  const values = ["total", "left"];
  const colors = getColors(selected);
  const titles = ["카테고리 설정 지출액", "설정가능자산"];

  return (
    <RoundedCard>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>지출 목표 금액</Typography>
          <Box
            onClick={handleSetting}
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <IconSVG id={"setting-secondary"} size={20} />
          </Box>
          <Typography fontWeight={500}>{goal.toLocaleString()}원</Typography>
        </Stack>
        <Box>
          <BarChart
            values={values}
            data={getData(ratio)}
            titles={titles}
            colors={colors}
            selected={selected}
            setSelected={setSelected}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontSize="13px"
              fontWeight={500}
            >{`설정한 금액 ${used.toLocaleString()}원`}</Typography>
            <Typography
              fontSize="13px"
              fontWeight={500}
              color="#8C919C"
            >{`지출목표액 ${goal.toLocaleString()}원`}</Typography>
          </Stack>
        </Box>
      </Stack>
    </RoundedCard>
  );
}

export default SummaryCard;
