import { SocialLoginStateType, SocialLoginType } from "@app/types/auth.ts";
import { Button } from "@mui/material";
import { DOMAIN } from "@api/url.ts";

interface SocialLoginProps {
  type: SocialLoginType;
}

const SOCIAL_LOGIN: SocialLoginStateType = {
  kakao: {
    image: "/icons/socialLogin/kakao.svg",
    path: `${DOMAIN}/login/kakao`,
  },
  naver: {
    image: "/icons/socialLogin/btnG_아이콘사각.png",
    path: `${DOMAIN}/login/naver`,
  },
};

function SocialLogin({ type }: SocialLoginProps) {
  return (
    <form
      action={SOCIAL_LOGIN[type].path}
      method="get"
      style={{ width: "100%" }}
    >
      <Button
        type="submit"
        sx={{
          p: 0,
        }}
      >
        <img src={SOCIAL_LOGIN[type].image} width={40} />
      </Button>
    </form>
  );
}

export default SocialLogin;
