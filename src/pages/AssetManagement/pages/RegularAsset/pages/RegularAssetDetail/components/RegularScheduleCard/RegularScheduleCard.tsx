import { Stack, Typography } from "@mui/material";
import {
  AmountComponent,
  AmountType,
} from "@components/ScheduleList/ScheduleCard/ScheduleCard.styles.ts";
import { getPriceTypeSign } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import moment from "moment";

export interface RegularScheduleCardProps {
  eventName: string;
  date: string;
  priceType: string;
  amount: number;
  onClick: () => void;
}

function RegularScheduleCard({
  eventName,
  priceType,
  date,
  amount,
  onClick,
}: RegularScheduleCardProps) {
  const isSpend = getPriceTypeSign(priceType) === "-";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="start"
      spacing={1.5}
      p={2}
      sx={{ borderBottom: "1px solid #F7F7F8" }}
      onClick={onClick}
    >
      <Stack
        justifyContent="space-between"
        sx={{ flexGrow: 1, height: "48px" }}
      >
        <Typography fontSize="13px" fontWeight={500}>
          {moment(date).format("YYYY.MM.DD")}
        </Typography>

        <Typography variant="h4">{eventName}</Typography>
      </Stack>

      <AmountComponent $isPredict={false}>
        <AmountType $isPredict={false} $isSpend={isSpend}>
          {getPriceTypeSign(priceType)}
        </AmountType>
        {amount.toLocaleString()}
      </AmountComponent>
    </Stack>
  );
}

export default RegularScheduleCard;
