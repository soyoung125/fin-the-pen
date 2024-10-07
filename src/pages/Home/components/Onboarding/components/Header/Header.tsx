import { Stack, Typography } from "@mui/material";
import LogoCircle from "@components/common/LogoCircle.tsx";

function Header({ step }: { step: number }) {
  const TITLE = [
    "일년 동안의 저축 목표 금액은 얼마인가요 ?",
    "한 달 동안의 소비 목표 금액은 얼마인가요 ?",
  ];

  return (
    <Stack py={3} px={2.5} alignItems="center" spacing={2}>
      <LogoCircle />
      <Stack my={2} spacing={1} alignItems="center">
        <Typography fontSize={22} fontWeight={700}>
          핀터펜 계정 가입
        </Typography>
        <Typography fontSize={18} fontWeight={700}>
          {TITLE[step]}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Header;
