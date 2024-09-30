import { Stack } from "@mui/material";
import CenterBox from "../../components/layouts/CenterBox";
import Header from "./Header.tsx";
import SignInFields from "./SignInFields.tsx";
import Footer from "./Footer.tsx";
import useHeader from "@hooks/useHeader.ts";
import { useEffect } from "react";
import { HEADER_MODE } from "@app/types/common.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import {
  setBottomBarOpenFalse,
  setBottomBarOpenTrue,
} from "@redux/slices/commonSlice.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";

function SignIn() {
  const dispatch = useAppDispatch();
  const { data: user } = useUser();
  // useHeader(false);
  useHeader(true, HEADER_MODE.sign);

  useEffect(() => {
    dispatch(setBottomBarOpenFalse());
    return () => dispatch(setBottomBarOpenTrue()) as unknown as void;
  }, []);

  return (
    <CenterBox>
      <Stack justifyContent="center" alignItems="center" px={1} spacing={3}>
        {!user ? ( // 버그 수정 필요
          <Stack justifyContent="center" alignItems="center" px="12px">
            <Header />
            <SignInFields />
          </Stack>
        ) : (
          <div>이미 로그인이 되어있습니다.</div>
        )}
        <Footer />
      </Stack>
    </CenterBox>
  );
}

export default SignIn;
