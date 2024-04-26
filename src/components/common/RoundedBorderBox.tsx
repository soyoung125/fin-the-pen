import { Box } from "@mui/material";

interface RoundedBorderBoxProps {
  children: Element;
  greyBorder?: Boolean;
}

function RoundedBorderBox({ children, greyBorder }: RoundedBorderBoxProps) {
  return (
    <Box
      sx={{
        border: "2px solid",
        borderRadius: 2,
        borderColor: greyBorder ? "#EDF1F7" : "primary.main",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

export default RoundedBorderBox;
