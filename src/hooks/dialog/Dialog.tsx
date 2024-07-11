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
  subContent?: string;
  onClickApprove: () => void;
  onClickReject: () => void;
  rejectText?: string;
  approveText?: string;
}

function Dialog({
  title,
  content,
  subContent,
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
      <Stack p="20px" spacing={2}>
        <Stack alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Stack>
        <Divider sx={{ backgroundColor: "black", height: "1px" }} />
        <Typography variant="h2" textAlign="center" whiteSpace="pre-line">
          {content}
        </Typography>
        <Typography
          textAlign="center"
          variant="h2"
          sx={{ fontWeight: 500, color: "#8C919C" }}
        >
          {subContent}
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
