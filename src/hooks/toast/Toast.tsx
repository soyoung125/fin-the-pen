import { ReactNode } from "react";
import { Snackbar, Stack } from "@mui/material";

export interface ToastProps {
  children: ReactNode;
  action?: ReactNode;
  hideDuration: number;
  color: string;
  onClickClose?: () => void;
}

function Toast({
  children,
  action,
  color,
  hideDuration,
  onClickClose,
}: ToastProps) {
  return (
    <Snackbar
      open={true}
      autoHideDuration={hideDuration}
      onClose={onClickClose}
      sx={{ width: "100dvw" }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor={color}
        color="#FFF"
        px={1}
        borderRadius={1}
        sx={{ mx: "auto", width: "100%", maxWidth: "500px" }}
      >
        {children}
        {action}
      </Stack>
    </Snackbar>
  );
}

export default Toast;
