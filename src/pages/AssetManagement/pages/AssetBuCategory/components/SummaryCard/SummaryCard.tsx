import { Box, Stack, Typography } from "@mui/material";
import { RoundedCard } from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard/SummaryCard.styles.ts";
import setting_secondary from "@assets/icons/setting_secondary.svg";
import BarChart from "@components/BarChart";
import { useState } from "react";
import {
  getColors,
  getData,
} from "@pages/AssetManagement/pages/AssetBuCategory/components/SummaryCard/utils.ts";

export interface SummaryCardProps {
  used: number;
  useable: number;
  goal: number;
  handleSetting: () => void;
}

function SummaryCard({ useable, used, goal, handleSetting }: SummaryCardProps) {
  const [selected, setSelected] = useState("used");

  const values = ["used", "useable"];
  const colors = getColors(selected);
  const titles = ["카테고리 설정 지출액", "설정가능자산"];

  return (
    <RoundedCard>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h3">지출 목표 금액</Typography>
          <Box
            onClick={handleSetting}
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <img src={setting_secondary} alt={"setting_secondary_icon"} />
          </Box>
          <Typography fontWeight={500}>{goal.toLocaleString()}원</Typography>
        </Stack>
        <Box>
          <BarChart
            values={values}
            data={getData(used, useable, goal)}
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
            <Typography variant="h3">{`설정한 금액 ${used.toLocaleString()}원`}</Typography>
            <Typography color="#8C919C">{`지출목표액 ${goal.toLocaleString()}원`}</Typography>
          </Stack>
        </Box>
      </Stack>
    </RoundedCard>
  );
}

export default SummaryCard;
