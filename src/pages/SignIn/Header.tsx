import { Stack, Typography } from "@mui/material";
import LogoCircle from "@components/common/LogoCircle.tsx";

function Header() {
  return (
    <Stack alignItems="center" spacing={2}>
      <LogoCircle />
      <Stack my={2}>
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          핀더펜 로그인
        </Typography>
      </Stack>
    </Stack>
  );
}
export default Header;
