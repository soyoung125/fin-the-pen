import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PATH from "../../../domain/constants/path";
import { isObjectValuesEmpty } from "../../../domain/tools";
import {
  NO_BLANKS,
  NO_DUPLICATION_ID,
  NO_SIGNAL_FROM_SERVER,
  SIGN_UP_SUCCESS,
} from "../../../domain/constants/messages";
import { fetchSignUp } from "../../../app/api/API";
import { ServerState, SignUp } from "../../../types/common";
import { LOCAL_STORAGE_KEY_SERVER } from "../../../app/api/keys.ts";
import { setSessionStorage } from "../../../app/utils/storage.ts";

function SignUpFields() {
  const navigate = useNavigate();
  const signUp = async (user: SignUp) => {
    console.log(user);
    const result = await fetchSignUp(user);
    // 에러 핸들링
    if (result === undefined) {
      setSessionStorage<ServerState>(LOCAL_STORAGE_KEY_SERVER, "guest");
      alert(
        `${NO_SIGNAL_FROM_SERVER} GUEST 모드로 회원가입 하려면 다시 회원가입 버튼을 눌러주세요.`
      );
      return;
    }
    if (result) {
      alert(SIGN_UP_SUCCESS);
      navigate(PATH.signIn);
    } else {
      alert(NO_DUPLICATION_ID);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        margin="normal"
        required
        fullWidth
        id="name"
        label="성명"
        name="name"
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일 주소"
        name="email"
        autoComplete="email"
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="small" color="success">
                사용가능
              </Button>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="전화번호"
        name="phoneNumber"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="small" color="success">
                인증완료
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" spacing={1} my={2}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={() => navigate(PATH.signIn)}
        >
          뒤로가기
        </Button>
        <Button type="submit" fullWidth variant="contained">
          회원가입
        </Button>
      </Stack>
    </Box>
  );
}

export default SignUpFields;
