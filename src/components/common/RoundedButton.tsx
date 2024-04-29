import { ToggleButton } from "@mui/material";
import * as React from "react";
import { ReactNode } from "react";

interface RoundedButtonProps {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>, value: unknown) => void;
  value: string;
}

function RoundedButton({ children, onClick, value }: RoundedButtonProps) {
  return (
    <ToggleButton
      id={value}
      value={value}
      sx={{
        color: "primary.main",
        borderRadius: 30,
        borderWidth: 0,
        padding: "0px",
      }}
      onClick={onClick}
      aria-label={value}
    >
      {children}
    </ToggleButton>
  );
}

export default RoundedButton;
