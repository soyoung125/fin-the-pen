import { SocialLoginStateType, SocialLoginType } from "@app/types/auth.ts";
import { Button } from "@mui/material";
import { DOMAIN } from "@api/url.ts";

interface SocialLoginProps {
  type: SocialLoginType;
}

const SOCIAL_LOGIN: SocialLoginStateType = {
  kakao: {
    image: "/icons/socialLogin/kakao_login_large_narrow.png",
    path: `${DOMAIN}/login/kakao`,
  },
  naver: {
    image: "/icons/socialLogin/btnW_완성형.png",
    path: `${DOMAIN}/login/naver`,
  },
};

function SocialLogin({ type }: SocialLoginProps) {
  return (
    <form action={SOCIAL_LOGIN[type].path} method="get">
      <Button type="submit" sx={{ padding: 0 }}>
        <img src={SOCIAL_LOGIN[type].image} width={200} />
      </Button>
    </form>
  );
}

export default SocialLogin;
