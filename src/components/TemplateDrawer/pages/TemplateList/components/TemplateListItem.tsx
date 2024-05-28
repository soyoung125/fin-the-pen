import { Stack } from "@mui/material";
import { RepeatBadge } from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem.style.ts";
import { Schedule } from "@app/types/schedule.ts";
import { getTitle } from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleList/utils.ts";
import ListItem from "@components/TemplateDrawer/components/ListItem";

export interface TemplateListItemProps {
  schedule: Schedule;
}

function TemplateListItem({ schedule }: TemplateListItemProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ListItem
        category={schedule.category}
        title={schedule.event_name}
        amount={Number(schedule.amount)}
      />
      <RepeatBadge>{getTitle(schedule)}</RepeatBadge>
    </Stack>
  );
}

export default TemplateListItem;
