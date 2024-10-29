import { Stack, Button, Typography } from "@mui/material";

interface FooterProps {
  step: number;
  handleNext: () => void;
}

function Footer({ step, handleNext }: FooterProps) {
  return (
    <Stack
      spacing={1}
      px={2.5}
      py={1}
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="subtitle1" color="#A9ACB2" onClick={handleNext}>
        질문 건너뛰기
      </Typography>
      <Button type="submit" variant="contained" fullWidth>
        입력 완료
      </Button>
    </Stack>
  );
}

export default Footer;
