import { Stack, Typography } from "@mui/material";
import { BottomButtonContainer, Button } from "./TodayButton.styles.ts";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { TITLE } from "@components/common/TodayButton/utils.ts";

export interface TodayButtonProps {
  goToday: () => void;
  type: "day" | "week" | "month";
}

function TodayButton({ goToday, type }: TodayButtonProps) {
  return (
    <BottomButtonContainer onClick={goToday}>
      <Button>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="h6" lineHeight="22px">
            {TITLE[type]}
          </Typography>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: "12px" }} />
        </Stack>
      </Button>
    </BottomButtonContainer>
  );
}

export default TodayButton;
