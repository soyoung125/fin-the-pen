import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { NO_BLANKS } from "@constants/messages.tsx";
import { isObjectValuesEmpty } from "@utils/tools.ts";
import { useAuth } from "@app/tanstack-query/useAuth.ts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSearchParams } from "react-router-dom";
import OutlinedInput from "@components/common/OutlinedInput";

function SignInFields() {
  const { signIn, isPending } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") as string;

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
    <Stack
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ maxWidth: "400px", px: 2.5, gap: 2, width: "100dvw" }}
    >
      <OutlinedInput
        required
        id="email"
        name="email"
        type="email"
        autoFocus={!email}
        placeholder="email@email.com"
        defaultValue={email}
      />
      <OutlinedInput
        required
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoFocus={email ? true : false}
        placeholder="비밀번호"
        autoComplete="current-password"
        endAdornment={
          <Box sx={{ width: "40px" }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
        }
      />

      <Button type="submit" fullWidth variant="contained">
        {isPending ? "로그인 중..." : "로그인"}
      </Button>

      <Typography
        variant="caption"
        sx={{ textDecorationLine: "underline" }}
        onClick={() =>
          alert(
            "You forget a thousand things every day. Make sure this is one of them :)"
          )
        }
      >
        비밀번호를 잊으셨나요?
      </Typography>
    </Stack>
  );
}

export default SignInFields;
