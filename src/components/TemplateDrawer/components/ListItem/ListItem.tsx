import { Stack } from "@mui/material";
import { CATEGORY_ICONS } from "@components/ScheduleList/constants.ts";
import CategoryIconSVG from "@components/common/CategoryIconSVG";
import {
  AmountLabel,
  CategoryLabel,
  TitleLabel,
} from "@components/TemplateDrawer/components/ListItem/ListItem.style.ts";

export interface ListItemProps {
  category: string;
  title: string;
  amount: number;
}

function ListItem({ category, amount, title }: ListItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <CategoryIconSVG id={CATEGORY_ICONS[category]} size={40} />

      <Stack>
        <CategoryLabel>{category}</CategoryLabel>
        <TitleLabel>{title}</TitleLabel>
        <AmountLabel>{amount.toLocaleString()}원</AmountLabel>
      </Stack>
    </Stack>
  );
}

export default ListItem;
