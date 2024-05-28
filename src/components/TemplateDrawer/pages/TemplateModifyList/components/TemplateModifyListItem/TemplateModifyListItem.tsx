import ListItem from "@components/TemplateDrawer/components/ListItem";
import { Box, Stack } from "@mui/material";
import { Schedule } from "@app/types/schedule.ts";
import MenuIcon from "@assets/icons/menu.svg";

export interface TemplateModifyListItemProps {
  schedule: Schedule;
}

function TemplateModifyListItem({ schedule }: TemplateModifyListItemProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ListItem
        category={schedule.category}
        title={schedule.event_name}
        amount={Number(schedule.amount)}
      />

      <img src={MenuIcon} alt="Menu icon" />
    </Stack>
  );
}

export default TemplateModifyListItem;
