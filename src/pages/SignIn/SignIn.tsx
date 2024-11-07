import { Stack } from "@mui/material";
import Header from "./Header.tsx";
import SignInFields from "./SignInFields.tsx";
import Footer from "./Footer.tsx";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { Link } from "react-router-dom";
import { getCookie } from "@utils/storage.ts";
import { COOKIE_KEY_ACCESS_TOKEN } from "@api/keys.ts";

function SignIn() {
  const accessToken = getCookie(COOKIE_KEY_ACCESS_TOKEN);

  useHeader(true, HEADER_MODE.sign);

  return (
    <Stack justifyContent="center" alignItems="center" px={2.5} spacing={3}>
      {!accessToken ? ( // 버그 수정 필요
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
      <Footer />
    </Stack>
  );
}

export default SignIn;
