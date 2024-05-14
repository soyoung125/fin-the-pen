import {
  CardContainer,
  IndexBox,
} from "@pages/AssetManagement/pages/RegularAsset/pages/DeleteRegularAssets/components/ScheduleCard/ScheduleCard.styles.ts";
import { Stack, Typography } from "@mui/material";
import {
  AmountComponent,
  AmountType,
} from "@components/ScheduleList/ScheduleCard/ScheduleCard.styles.ts";
import { getPriceTypeSign } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import moment from "moment";

export interface ScheduleCardProps {
  id: number;
  isSelected: boolean;
  date: string;
  event_name: string;
  priceType: string;
  amount: number;
}

function ScheduleCard({
  id,
  isSelected,
  date,
  amount,
  priceType,
  event_name,
}: ScheduleCardProps) {
  return (
    <CardContainer $isSelected={isSelected}>
      <IndexBox $isSelected={isSelected}>{id}</IndexBox>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        flexGrow={1}
      >
        <Stack spacing="6px">
          <Typography variant="subtitle2">
            {moment(date).format("YYYY.MM.DD")}
          </Typography>
          <Typography variant="h4">{event_name}</Typography>
        </Stack>
        <AmountComponent>
          <AmountType $isSpend={false}>
            {getPriceTypeSign(priceType)}
          </AmountType>
          {amount.toLocaleString()}
        </AmountComponent>
      </Stack>
    </CardContainer>
  );
}

export default ScheduleCard;
