import { Stack } from "@mui/material";
import { RepeatBadge } from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem/TemplateListItem.style.ts";
import { Schedule } from "@app/types/schedule.ts";
import { getTitle } from "@components/TemplateDrawer/pages/TemplateList/utils.ts";
import ListItem from "@components/TemplateDrawer/components/ListItem";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export interface TemplateListItemProps {
  schedule: Schedule;
  handleClick: () => void;
  arrow?: boolean;
  hideAmount?: boolean;
}

function TemplateListItem({
  schedule,
  handleClick,
  arrow,
  hideAmount,
}: TemplateListItemProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      onClick={handleClick}
      p={2}
    >
      <ListItem
        category={schedule.category}
        title={schedule.event_name}
        amount={Number(schedule.amount)}
        hideAmount={hideAmount}
      />
      <Stack direction="row" alignItems="center">
        <RepeatBadge>{getTitle(schedule)}</RepeatBadge>
        {arrow && (
          <ArrowForwardIosRoundedIcon
            sx={{ color: "#A9ACB2", fontSize: "20px" }}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default TemplateListItem;
