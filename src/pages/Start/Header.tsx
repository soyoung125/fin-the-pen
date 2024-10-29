import { Stack, Typography } from "@mui/material";
import LogoCircle from "@components/common/LogoCircle.tsx";

function Header() {
  return (
    // <Stack pb={3} pt={5} px={2.5} alignItems="center" spacing={2}>
    //   <LogoCircle />
    //   <Stack my={2}>
    //     <Typography variant="h2" textAlign="center" whiteSpace="break-spaces">
    //       {`핀더펜과 함께\n자산 설계를 시작하세요 !`}
    //     </Typography>
    //   </Stack>
    // </Stack>
    <Stack alignItems="center" spacing={2}>
      <LogoCircle />
      <Stack my={2}>
        <Typography variant="h2" textAlign="center" whiteSpace="break-spaces">
          {`핀더펜과 함께\n자산 설계를 시작하세요 !`}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Header;
