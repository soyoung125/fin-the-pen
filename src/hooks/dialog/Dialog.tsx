import {
  Button,
  Dialog as MuiDialog,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export interface DialogProps {
  title?: string;
  content?: string;
  onClickApprove: () => void;
  onClickReject: () => void;
  rejectText?: string;
  approveText?: string;
}

function Dialog({
  title,
  content,
  onClickApprove,
  onClickReject,
  rejectText,
  approveText,
}: DialogProps) {
  return (
    <MuiDialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "1rem", width: "100%" } }}
      open={true}
      scroll="body"
    >
      <Stack p="20px">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mb={2}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Stack>
        <Divider sx={{ backgroundColor: "black", height: "1px" }} />
        <Typography
          variant="h2"
          textAlign="center"
          my="24px"
          whiteSpace="pre-line"
        >
          {content}
        </Typography>
        <Stack direction="row" gap="10px">
          {rejectText && (
            <Button variant="outlined" onClick={onClickReject} fullWidth>
              {rejectText}
            </Button>
          )}
          {approveText && (
            <Button variant="contained" onClick={onClickApprove} fullWidth>
              {approveText}
            </Button>
          )}
        </Stack>
      </Stack>
    </MuiDialog>
  );
}

export default Dialog;
