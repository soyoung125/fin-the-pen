import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { PATH } from "@constants/path.ts";
import SocialLogin from "pages/Start/components/SocialLogin";
import { useNavigate } from "react-router-dom";
import useHeader from "@hooks/useHeader.ts";
import Header from "@pages/Start/Header.tsx";
import { FormEvent } from "react";
import OutlinedInput from "@components/common/OutlinedInput";

function Start() {
  const navigate = useNavigate();

  useHeader(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value.toString();
    navigate(PATH.signIn(email));
  };

  return (
    <Stack justifyContent="center" alignItems="center" px={2.5} spacing={5}>
      <Header />
      <Stack
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ maxWidth: "400px", px: 2.5, gap: 2, width: "100%" }}
      >
        <OutlinedInput
          required
          id="email"
          name="email"
          type="email"
          autoFocus
          placeholder="Email Adress"
        />

        <Button type="submit" fullWidth variant="contained">
          로그인
        </Button>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="caption" component="p">
            계정이 없으신가요 ?
          </Typography>
          <Typography
            color="info.main"
            variant="caption"
            sx={{ pl: 0 }}
            onClick={() => navigate(PATH.signUp)}
          >
            핀더펜 가입하기
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ maxWidth: "400px", px: 3, width: "100%" }}
      >
        <Box
          flexGrow={1}
          sx={{ width: "100%", height: "1px", backgroundColor: "#A9ACB2" }}
        />
        <Typography variant="subtitle2">OR</Typography>
        <Box
          flexGrow={1}
          sx={{ width: "100%", height: "1px", backgroundColor: "#A9ACB2" }}
        />
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={1}>
        <SocialLogin type="kakao" />
        <SocialLogin type="naver" />
      </Stack>
    </Stack>
  );
}

export default Start;
