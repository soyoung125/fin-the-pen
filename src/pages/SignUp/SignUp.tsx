import { Stack } from "@mui/material";
import useHeader from "@hooks/useHeader.ts";
import Header from "./Header.tsx";
import SignUpFields from "./SignUpFields.tsx";
import { useEffect } from "react";
import { HEADER_MODE } from "@app/types/common.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import { setBottomBarOpenFalse } from "@redux/slices/commonSlice.tsx";

function SignUp() {
  const dispatch = useAppDispatch();

  useHeader(true, HEADER_MODE.sign);

  useEffect(() => {
    dispatch(setBottomBarOpenFalse());
  }, []);

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
