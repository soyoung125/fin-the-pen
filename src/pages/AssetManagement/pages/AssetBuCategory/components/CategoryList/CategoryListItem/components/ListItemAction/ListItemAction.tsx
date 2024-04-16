import { Button, Stack } from "@mui/material";

export interface ListItemActionProps {
  handleCancel: () => void;
  handleSubmit: () => void;
}

function ListItemAction({ handleCancel, handleSubmit }: ListItemActionProps) {
  return (
    <Stack direction="row" spacing={1} px={3} pt={1}>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        확인
      </Button>
    </Stack>
  );
}

export default ListItemAction;
