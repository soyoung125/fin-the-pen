import { Box, Stack } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { AssetManagement } from "@constants/managements.ts";
import useAsset from "@hooks/assetManagement/useAsset.ts";

interface SettingCardProps {
  setting: AssetManagement;
  index: number;
}

function SettingCard({ setting, index }: SettingCardProps) {
  const { setMenu } = useAsset();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={() => setMenu(index)}
      py={2}
      pr={1.5}
    >
      <Box sx={{ typography: "h4" }}>{setting.title}</Box>
      <ArrowForwardIosRoundedIcon sx={{ color: "#A9ACB2", fontSize: "18px" }} />
    </Stack>
  );
}

export default SettingCard;
