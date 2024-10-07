import { Stack } from "@mui/material";
import useHeader from "@hooks/useHeader.ts";
import Header from "./Header.tsx";
import SignUpFields from "./SignUpFields.tsx";
import { HEADER_MODE } from "@app/types/common.ts";

function SignUp() {
  useHeader(true, HEADER_MODE.sign);

  return (
    <Stack justifyContent="center" alignItems="center" px={2.5} spacing={7}>
      <Header />
      <SignUpFields />
    </Stack>
  );
}

export default SignUp;
/**
 * 회원가입 페이지
 */
