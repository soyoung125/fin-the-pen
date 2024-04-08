import { Box, Stack, Typography } from "@mui/material";
import reset_white from "@assets/icons/reset_white.svg";

export interface CategoryListHeaderProps {
  handleReset: () => void;
}

function CategoryListHeader({ handleReset }: CategoryListHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2.5}
      py={2}
      sx={{ backgroundColor: "primary.main", color: "#FFF" }}
    >
      <Typography variant="h2">카테고리별 지출 금액 설정</Typography>
      <Box onClick={handleReset}>
        <img src={reset_white} alt="reset_white_icon" />
      </Box>
    </Stack>
  );
}

export default CategoryListHeader;
