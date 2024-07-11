import { BoxContainer } from "@components/TemplateDrawer/pages/TemplateModify/components/DeleteBox/DeleteBox.styles.ts";
import { Button, Stack } from "@mui/material";

export interface IDeleteBoxProps {
  handleDelete: () => void;
  handleCancel: () => void;
}

function DeleteBox({ handleDelete, handleCancel }: IDeleteBoxProps) {
  return (
    <BoxContainer>
      <Stack direction="row">
        <Button fullWidth color="error" onClick={handleDelete}>
          삭제
        </Button>
        <Button fullWidth onClick={handleCancel}>
          취소
        </Button>
      </Stack>
    </BoxContainer>
  );
}

export default DeleteBox;
