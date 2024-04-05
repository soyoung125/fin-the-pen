import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export interface ConfirmModalProps {
  closeModal: () => void;
  handleApprove: () => void;
  handleReject: () => void;
}

function ConfirmModal({
  closeModal,
  handleReject,
  handleApprove,
}: ConfirmModalProps) {
  return (
    <Stack spacing={3} p="20px">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pb: "12px", borderBottom: "1px solid #C8CBD0" }}
      >
        <Box width={40} />
        <Typography variant="h1">알림</Typography>
        <IconButton onClick={closeModal}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Box
        sx={{ textAlign: "center", whiteSpace: "pre-line", fontSize: "16px" }}
      >
        {`이미 설정한 지출 목표액이 있습니다.\n정기 지출 목표액으로 변경하시겠습니까?`}
      </Box>

      <Stack spacing={1}>
        <Button variant="contained" onClick={handleApprove}>
          예(설정한 정기목표액으로 일괄변경)
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReject}>
          아니오(설정한 지출 목표액 유지)
        </Button>
      </Stack>
    </Stack>
  );
}

export default ConfirmModal;
