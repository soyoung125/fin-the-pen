import { Box } from "@mui/material";
import RoundedBorderBox from "@components/common/RoundedBorderBox.tsx";

function EmptySpendCard() {
  return (
    <RoundedBorderBox greyBorder>
      <Box p={2} textAlign="center" color="#8C919C">
        지출 금액 정보가 없습니다.
      </Box>
    </RoundedBorderBox>
  );
}

export default EmptySpendCard;
