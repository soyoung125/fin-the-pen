import { Button, Stack, Typography } from "@mui/material";
import reset from "@assets/icons/reset.svg";

export interface DrawerActionProps {
  handleCancel: () => void;
  handleSubmit: () => void;
}

function DrawerAction({ handleCancel, handleSubmit }: DrawerActionProps) {
  return (
    <Stack pt={1} px={2.5} pb={2.5} spacing={1}>
      <Stack
        justifyContent="center"
        direction="row"
        alignItems="center"
        color="#8C919C"
        py="3px"
        spacing={0.5}
        borderTop="1px solid #DEE0E3"
      >
        <img src={reset} alt="reset" width="14px" height="14px" />
        <Typography fontSize="13px">
          해당 정기일정의 모든 일정에 수정사항이 반영됩니다.
        </Typography>
      </Stack>

      <Stack direction="row" mt="8px" mb="20px" mx="20px" spacing={1}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          설정 완료
        </Button>
      </Stack>
    </Stack>
  );
}

export default DrawerAction;
