import { Stack } from "@mui/material";
import Header from "./Header.tsx";
import SignInFields from "./SignInFields.tsx";
import Footer from "./Footer.tsx";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { useUser } from "@app/tanstack-query/useUser.ts";

function SignIn() {
  const { data: user } = useUser();

  useHeader(true, HEADER_MODE.sign);

  return (
    <Stack justifyContent="center" alignItems="center" px={1} spacing={3}>
      {!user ? ( // 버그 수정 필요
        <Stack
          justifyContent="center"
          alignItems="center"
          px="12px"
          spacing={7}
        >
          <Header />
          <SignInFields />
        </Stack>
      ) : (
        <div>이미 로그인이 되어있습니다.</div>
      )}
      <Footer />
    </Stack>
  );
}

export default SignIn;
