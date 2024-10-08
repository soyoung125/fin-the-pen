import { Stack } from "@mui/material";
import Header from "./Header.tsx";
import SignInFields from "./SignInFields.tsx";
import Footer from "./Footer.tsx";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { Link } from "react-router-dom";
import CenterBox from "@components/layouts/CenterBox.tsx";

function SignIn() {
  const { data: user } = useUser();

  useHeader(true, HEADER_MODE.sign);

  return (
    <Stack justifyContent="center" alignItems="center" px={1} spacing={3}>
      <CenterBox>
        <Stack
          justifyContent="center"
          alignItems="center"
          px="12px"
          spacing={7}
        >
          {!user || Object.keys(user).length === 0 ? ( // 버그 수정 필요
            <>
              <Header />
              <SignInFields />
            </>
          ) : (
            <>
              <div>이미 로그인이 되어있습니다.</div>
              <Link to="/home">홈으로 가기</Link>
            </>
          )}
        </Stack>
      </CenterBox>
      <Footer />
    </Stack>
  );
}

export default SignIn;
