import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import { MouseEventHandler } from "react";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

interface CategoryInputProps {
  selectedCategory: string;
  showError: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

export default function CategoryInput({
  selectedCategory,
  showError,
  onClick,
}: CategoryInputProps) {
  return (
    <FormControl fullWidth onClick={onClick}>
      <TextField
        sx={{
          px: 2.5,
          ".MuiInputBase-root.MuiInput-root:before": {
            borderBottomColor: "#F7F7F8",
          },
        }}
        value={selectedCategory}
        variant="standard"
        placeholder={"카테고리 선택"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{ typography: "h2", color: "#131416" }}>
                {SCHEDULE_DRAWER.category_title}
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: "24px" }} />
          ),
        }}
        inputProps={{
          style: { textAlign: "right", padding: "12px 0px" },
        }}
      />
    </FormControl>
  );
}
