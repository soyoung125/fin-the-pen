import { Box } from "@mui/material";
import { ReactNode } from "react";

interface RoundedBorderBoxProps {
  children: ReactNode;
  greyBorder?: boolean;
}

function RoundedBorderBox({ children, greyBorder }: RoundedBorderBoxProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "4px",
        borderColor: greyBorder ? "#EDF1F7" : "primary.main",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

export default RoundedBorderBox;
