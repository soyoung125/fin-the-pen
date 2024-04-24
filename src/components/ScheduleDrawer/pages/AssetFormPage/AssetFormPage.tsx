import { Stack } from "@mui/material";
import ImportanceInput from "./ImportanceInput.tsx";
import SpendingInput from "./SpendingInput.tsx";
import ThickDivider from "@components/common/ThickDivider.tsx";

function AssetFormPage() {
  return (
    <Stack spacing={2}>
      <SpendingInput />
      <ThickDivider />

      <ImportanceInput />
      {/*<ThickDivider />*/}

      {/*<ExclusionInput />*/}
    </Stack>
  );
}

export default AssetFormPage;
