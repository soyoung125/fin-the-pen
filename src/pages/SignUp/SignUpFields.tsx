import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isObjectValuesEmpty } from "@utils/tools.ts";
import {
  NO_BLANKS,
  NO_DUPLICATION_ID,
  NO_SIGNAL_FROM_SERVER,
  SIGN_UP_SUCCESS,
} from "@constants/messages.tsx";
import { DOMAIN } from "@api/url.ts";
import { FormEvent, useRef, useState } from "react";
import { SignUp } from "@app/types/auth.ts";
import { PATH } from "@constants/path.ts";
import OutlinedInput from "@components/common/OutlinedInput";

function SignUpFields() {
  const navigate = useNavigate();
  const [isSamePassword, setIsSamePassword] = useState(true);
  const inputPWd = useRef<HTMLInputElement>(null);
  const inputPwdCheck = useRef<HTMLInputElement>(null);

  const endAdornmentCss = {
    wordBreak: "keep-all",
    borderRadius: 1,
    py: 1,
    px: 1.5,
    mr: 1,
    typography: "subtitle2",
  };

  const validatePassword = () =>
    setIsSamePassword(inputPWd.current?.value === inputPwdCheck.current?.value);

  const signUp = async (user: SignUp) => {
    await fetch(`${DOMAIN}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.user_id === user.user_id) {
          alert(SIGN_UP_SUCCESS);

          const email = user.user_id as string;
          navigate(PATH.signIn(email), { replace: true });
        } else {
          alert(NO_DUPLICATION_ID);
        }
      })
      .catch((err) => {
        alert(NO_SIGNAL_FROM_SERVER);
        console.error(err);
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      user_id: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      phone_number: data.get("phoneNumber"),
    };
    const invalidIndex = isObjectValuesEmpty(user);
    if (invalidIndex === -1) {
      signUp(user);
    } else {
      alert(NO_BLANKS);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      noValidate
      spacing={2}
      sx={{ maxWidth: "400px", width: "100%", pb: 10 }}
    >
      <OutlinedInput
        required
        id="name"
        name="name"
        autoFocus
        placeholder="성명"
      />

      <OutlinedInput
        required
        id="email"
        name="email"
        type="email"
        autoFocus
        placeholder="email@email.com"
      />

      <Box mt={1}>비밀번호 입력</Box>
      <OutlinedInput
        required
        id="password"
        name="password"
        type="password"
        autoFocus
        placeholder="비밀번호"
        autoComplete="current-password"
        onChange={validatePassword}
        inputRef={inputPWd}
        endAdornment={
          <Box bgcolor="primary.main" color="white" sx={endAdornmentCss}>
            사용가능
          </Box>
        }
      />
      <OutlinedInput
        required
        id="password_check"
        name="password_check"
        type="password"
        autoFocus
        placeholder="비밀번호 확인"
        autoComplete="current-password"
        onChange={validatePassword}
        inputRef={inputPwdCheck}
        endAdornment={
          <Box
            bgcolor={isSamePassword ? "primary.main" : "warning.main"}
            color={isSamePassword ? "white" : "black"}
            sx={endAdornmentCss}
          >
            {isSamePassword ? "동일" : "재입력"}
          </Box>
        }
      />

      <Box mt={1}>전화번호 인증</Box>
      <OutlinedInput
        required
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        autoFocus
        placeholder="‘-’없이 입력"
        inputMode="numeric"
        pattern="[0-9]{11}"
      />
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          bottom: "15px",
          left: 0,
          width: "100%",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginX: "20px" }}
        >
          회원가입
        </Button>
      </Box>
    </Stack>
  );
}

export default SignUpFields;
