import { Box, Button, InputAdornment, TextField } from "@mui/material";
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

function SignUpFields() {
  const navigate = useNavigate();
  const [isSamePassword, setIsSamePassword] = useState(true);
  const inputPWd = useRef<HTMLFormElement>(null);
  const inputPwdCheck = useRef<HTMLFormElement>(null);

  const validatePassword = () =>
    inputPWd.current?.value === inputPwdCheck.current?.value
      ? setIsSamePassword(true)
      : setIsSamePassword(false);

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
          navigate(-1);
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ maxWidth: "400px" }}
    >
      <TextField
        margin="dense"
        required
        fullWidth
        id="name"
        inputProps={{
          "data-testid": "name",
        }}
        label="성명"
        name="name"
        autoFocus
        size="small"
      />

      <TextField
        margin="dense"
        required
        fullWidth
        id="email"
        inputProps={{
          "data-testid": "email",
        }}
        label="이메일 주소"
        name="email"
        autoComplete="email"
        autoFocus
        placeholder="email@email.com"
        size="small"
      />

      <Box mt={1}>비밀번호 입력</Box>
      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        inputProps={{
          "data-testid": "password",
        }}
        autoComplete="current-password"
        size="small"
        inputRef={inputPWd}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="small" color="primary">
                사용가능
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="dense"
        required
        fullWidth
        name="password_check"
        label="비밀번호 확인"
        type="password"
        id="password_check"
        inputProps={{
          "data-testid": "password_check",
        }}
        autoComplete="current-password"
        size="small"
        inputRef={inputPwdCheck}
        onChange={validatePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                size="small"
                color={isSamePassword ? "primary" : "warning"}
              >
                {isSamePassword ? "동일" : "재입력"}
              </Button>
            </InputAdornment>
          ),
        }}
      />

      <Box mt={1}>전화번호 인증</Box>
      <TextField
        margin="dense"
        required
        fullWidth
        id="phoneNumber"
        inputProps={{
          "data-testid": "phoneNumber",
        }}
        label="전화번호"
        name="phoneNumber"
        autoFocus
        size="small"
        placeholder="'-'없이 입력"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="small" color="primary">
                인증완료
              </Button>
            </InputAdornment>
          ),
        }}
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
    </Box>
  );
}

export default SignUpFields;
