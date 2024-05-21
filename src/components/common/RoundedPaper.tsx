import { Box } from "@mui/material";
import React from "react";

interface RoundedPaperProps {
  children: React.ReactNode;
  my?: number;
}

function RoundedPaper({ children, my }: RoundedPaperProps) {
  return (
    <Box
      sx={{
        marginY: my ?? 0,
        padding: "20px",
        borderRadius: "20px",
        border: "1px solid #DEE0E3",
      }}
    >
      {children}
    </Box>
  );
}

export default RoundedPaper;
