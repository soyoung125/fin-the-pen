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
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ bottom: "90px" }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        bgcolor={color}
        color="#FFF"
        px={1}
        borderRadius={1}
      >
        {children}
        {action}
      </Stack>
    </Snackbar>
  );
}

export default Toast;
