import { Box, Stack } from "@mui/material";
import { IOnboarding } from "@components/OnBorading/components/OnBoardingCard/asets.ts";

function OnBoardingCard({ onboarding }: { onboarding: IOnboarding }) {
  return (
    <Stack spacing="25px">
      <Box
        fontSize={24}
        fontWeight={600}
        whiteSpace="pre-line"
        textAlign="center"
      >
        {onboarding.title}
      </Box>
      <img
        src={onboarding.image}
        width={320}
        height={320}
        alt={onboarding.title}
      />
    </Stack>
  );
}

export default OnBoardingCard;
