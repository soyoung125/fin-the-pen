import { ReactNode } from "react";
import { Snackbar, Stack, Typography } from "@mui/material";

export interface ToastProps {
  text: string;
  action?: ReactNode;
  hideDuration: number;
  color: string;
  onClickClose?: () => void;
}

function Toast({
  text,
  action,
  color,
  hideDuration,
  onClickClose,
}: ToastProps) {
  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={hideDuration}
        onClose={onClickClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: "90px", left: 0 }}
      >
        <Stack
          justifyContent="space-between"
          alignItems="center"
          bgcolor={color}
          color="#FFF"
          px={2}
          py={1}
          borderRadius={1}
        >
          <Typography flexGrow={1}>{text}</Typography>
          {action}
        </Stack>
      </Snackbar>
    </div>
  );
}

export default Toast;
