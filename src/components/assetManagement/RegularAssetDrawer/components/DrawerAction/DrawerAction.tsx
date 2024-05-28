import { Button, Stack, Typography } from "@mui/material";
import reset from "@assets/icons/reset.svg";

export interface DrawerActionProps {
  handleCancel: () => void;
  handleSubmit: () => void;
}

function DrawerAction({ handleCancel, handleSubmit }: DrawerActionProps) {
  return (
    <Stack direction="row" mt="8px" mb="20px" mx="20px" spacing={1} px={2.5}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleCancel}
      >
        삭제
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        선택 일정 수정
      </Button>
    </Stack>
  );
}

export default DrawerAction;
