import { SocialLoginStateType, SocialLoginType } from "@app/types/auth.ts";
import { Box, Button } from "@mui/material";

interface SocialLoginProps {
  type: SocialLoginType;
}

const SOCIAL_LOGIN: SocialLoginStateType = {
  kakao: {
    image: "/icons/socialLogin/kakao.svg",
    path: `http://localhost:8080/login/kakao`,
  },
  naver: {
    image: "/icons/socialLogin/btnG_아이콘사각.png",
    path: `http://localhost:8080/login/naver`,
  },
};

function SocialLogin({ type }: SocialLoginProps) {
  return (
    <Box
      component="form"
      action={SOCIAL_LOGIN[type].path}
      method="get"
      style={{ width: "100%" }}
    >
      <Button
        type="submit"
        sx={{
          p: 0,
        }}
        aria-label={`social_${type}`}
      >
        <img src={SOCIAL_LOGIN[type].image} width={40} alt={`social_${type}`} />
      </Button>
    </Box>
  );
}

export default SocialLogin;
