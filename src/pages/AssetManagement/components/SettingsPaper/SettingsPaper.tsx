import { Stack } from "@mui/material";
import assetManagements, {
  AssetManagement,
} from "../../../../constants/managements.ts";
import SettingCard from "./SettingCard.tsx";

function SettingsPaper() {
  return (
    <Stack>
      {assetManagements.map((s: AssetManagement, index) => (
        <SettingCard setting={s} index={index} key={s.path} />
      ))}
    </Stack>
  );
}

export default SettingsPaper;
