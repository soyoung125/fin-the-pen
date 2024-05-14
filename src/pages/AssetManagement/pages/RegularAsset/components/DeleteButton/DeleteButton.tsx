import { Stack, Typography } from "@mui/material";
import { BottomButtonConainer } from "@components/common/TodayButton/TodayButton.styles.ts";
import { Button } from "./DeleteButton.styles.ts";
import delete_white from "@assets/icons/delete_white.svg";

export interface DeleteButtonProps {
  clickAction: () => void;
}

function DeleteButton({ clickAction }: DeleteButtonProps) {
  return (
    <BottomButtonConainer onClick={clickAction}>
      <Button>
        <Stack direction="row" spacing="2px" alignItems="center">
          <img src={delete_white} alt={"delete_white"} />
          <Typography variant="h6" lineHeight="22px">
            일정 삭제
          </Typography>
        </Stack>
      </Button>
    </BottomButtonConainer>
  );
}

export default DeleteButton;
