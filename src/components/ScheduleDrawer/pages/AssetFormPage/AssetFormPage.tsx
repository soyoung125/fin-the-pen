import { Stack } from "@mui/material";
import PaymentTypeInput from "./PaymentTypeInput.tsx";
import SpendingInput from "./SpendingInput.tsx";
import ThickDivider from "@components/common/ThickDivider.tsx";

function AssetFormPage() {
  return (
    <Stack spacing={2}>
      <SpendingInput />
      <ThickDivider />

      <PaymentTypeInput />
      {/*<ThickDivider />*/}

      {/*<ExclusionInput />*/}
    </Stack>
  );
}

export default AssetFormPage;
