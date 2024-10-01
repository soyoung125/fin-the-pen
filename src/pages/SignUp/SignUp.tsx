import { Stack } from "@mui/material";
import CenterBox from "../../components/layouts/CenterBox";
import useHeader from "@hooks/useHeader.ts";
import Header from "./Header.tsx";
import SignUpFields from "./SignUpFields.tsx";
import { useEffect } from "react";
import { HEADER_MODE } from "@app/types/common.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import {
  setBottomBarOpenFalse,
  setBottomBarOpenTrue,
} from "@redux/slices/commonSlice.tsx";

function SignUp() {
  const dispatch = useAppDispatch();

  // useHeader(false);
  useHeader(true, HEADER_MODE.sign);

  useEffect(() => {
    dispatch(setBottomBarOpenFalse());
  }, []);

  return (
    <CenterBox>
      <Stack justifyContent="center" alignItems="center" px={2.5}>
        <Header />
        <SignUpFields />
      </Stack>
    </CenterBox>
  );
}

export default SignUp;
/**
 * 회원가입 페이지
 */
