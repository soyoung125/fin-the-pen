import { Box, Stack, Typography } from "@mui/material";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import { AmountComponent, AmountType } from "./ScheduleCard.styles.ts";
import { getPriceTypeSign } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import CategoryIconSVG from "@components/common/CategoryIconSVG";

export interface ConsumptionCardProps {
  category: string;
  title: string;
  eventName: string;
  priceType: string;
  amount: number;
  isRepeat: boolean;
  onClick: () => void;
  isPredict?: boolean;
  icon?: boolean;
}

function ScheduleCard({
  title,
  eventName,
  priceType,
  isPredict,
  amount,
  category,
  isRepeat,
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
        <CategoryIconSVG id={category} size={36} />
      )}
      <Stack
        justifyContent="space-between"
        sx={{ flexGrow: 1, height: "48px" }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography fontSize="13px" fontWeight={500}>
            {title}
          </Typography>
          {isRepeat && <RepeatRoundedIcon color="success" fontSize="small" />}
        </Stack>

        <Typography variant="h4">{eventName}</Typography>
      </Stack>

      <Box height={48}>
        <AmountComponent $isPredict={isPredict}>
          <AmountType $isPredict={isPredict} $isSpend={isSpend}>
            {getPriceTypeSign(priceType)}
          </AmountType>
          {amount.toLocaleString()}
        </AmountComponent>
      </Box>
    </Stack>
  );
}

export default ScheduleCard;
