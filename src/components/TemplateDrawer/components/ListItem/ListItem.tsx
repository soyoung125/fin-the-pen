import { Stack } from "@mui/material";
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
  hideAmount?: boolean;
}

function ListItem({ category, amount, title, hideAmount }: ListItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexGrow={1}>
      <CategoryIconSVG id={category} size={40} />

      <Stack>
        <CategoryLabel>{category}</CategoryLabel>
        <TitleLabel>{title}</TitleLabel>
        {!hideAmount && <AmountLabel>{amount.toLocaleString()}원</AmountLabel>}
      </Stack>
    </Stack>
  );
}

export default ListItem;
