import { Box, Stack, Typography } from "@mui/material";
import OutlinedInput from "@components/common/OutlinedInput";
import { useEffect, useState } from "react";

const CONTENTS = [
  {
    placeholder: "5,000",
    title: "저축 목표 금액",
  },
  {
    placeholder: "2,000",
    title: "월 소비 목표 금액 ",
  },
];

function Body({ step }: { step: number }) {
  const [amount, setAmount] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value.replaceAll(",", ""));
    if (newAmount) setAmount(newAmount.toLocaleString());
  };

  useEffect(() => {
    setAmount("");
  }, [step]);

  return (
    <Stack spacing={2} flexGrow={1} px={2.5} width="100%">
      <OutlinedInput
        required
        id="amount"
        name="amount"
        autoFocus
        value={amount}
        onChange={handleChange}
        placeholder={CONTENTS[step].placeholder}
        inputMode="numeric"
        style={{ textAlign: "right" }}
        endAdornment={
          <Box
            sx={{
              wordBreak: "keep-all",
              typography: "subtitle2",
            }}
          >
            만원
          </Box>
        }
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        color="#8C919C"
      >
        <Typography variant="caption">{CONTENTS[step].title}</Typography>
        <Typography variant="caption">
          최소 100,000원 - 최대 900,000,000원
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Body;
