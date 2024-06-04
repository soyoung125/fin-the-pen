import { Avatar, Stack, Typography } from "@mui/material";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  AmountComponent,
  AmountType,
} from "@components/ScheduleList/ScheduleCard/ScheduleCard.styles.ts";
import { getPriceTypeSign } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import { ConsumptionCardProps } from "@components/ScheduleList/ScheduleCard/ScheduleCard.tsx";
import CategoryIconSVG from "@components/common/CategoryIconSVG";

function RegularScheduleCard({
  title,
  eventName,
  priceType,
  isPredict,
  amount,
  category,
  onClick,
  icon,
}: ConsumptionCardProps) {
  const isSpend = priceType === "-";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1.5}
      p={2}
      sx={{ borderBottom: "1px solid #F7F7F8" }}
      onClick={onClick}
    >
      {icon && (
        // <Avatar
        //   alt="category icon"
        //   src={CATEGORY_ICONS[category]}
        //   sx={{ width: 36, height: 36 }}
        // >
        //   {category}
        // </Avatar>
        <CategoryIconSVG id={CATEGORY_ICONS[category]} size={36} />
      )}
      <Stack
        justifyContent="space-between"
        sx={{ flexGrow: 1, height: "48px" }}
      >
        <Typography fontSize="13px" fontWeight={500}>
          {title}
        </Typography>

        <Typography variant="h4">{eventName}</Typography>
      </Stack>

      <Stack height={48} direction="row" spacing={1} alignItems="center">
        <AmountComponent $isPredict={isPredict}>
          <AmountType $isPredict={isPredict} $isSpend={isSpend}>
            {getPriceTypeSign(priceType)}
          </AmountType>
          {amount.toLocaleString()}
        </AmountComponent>
        <ArrowForwardIosRoundedIcon />
      </Stack>
    </Stack>
  );
}

export default RegularScheduleCard;
