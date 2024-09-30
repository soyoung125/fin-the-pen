import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NO_BLANKS } from "@constants/messages.tsx";
import { PATH } from "@constants/path.ts";
import { isObjectValuesEmpty } from "@utils/tools.ts";
import { useAuth } from "@app/tanstack-query/useAuth.ts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SocialLogin from "@pages/SignIn/components/SocialLogin";

function SignInFields() {
  const navigate = useNavigate();
  const { signIn, isPending } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const sign = {
      user_id: data.get("email"),
      password: data.get("password"),
    };
    const invalidIndex = isObjectValuesEmpty(sign);
    if (invalidIndex === -1) {
      signIn(sign);
    } else {
      alert(NO_BLANKS);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
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
          id="email"
          label="이메일"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="dense"
          required
          fullWidth
          name="password"
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />

        <Button
          sx={{ pl: 0 }}
          onClick={() =>
            alert(
              "You forget a thousand things every day. Make sure this is one of them :)"
            )
          }
        >
          비밀번호를 잊으셨나요?
        </Button>

        <Button type="submit" fullWidth variant="contained">
          {isPending ? "로그인 중..." : "로그인"}
        </Button>

        <Button onClick={() => navigate(PATH.signUp)} sx={{ pl: 0 }}>
          계정이 없으신가요?
        </Button>
      </Box>

      <Stack justifyContent="center" spacing={1}>
        <SocialLogin type="kakao" />
        <SocialLogin type="naver" />
      </Stack>
    </>
  );
}

export default SignInFields;
