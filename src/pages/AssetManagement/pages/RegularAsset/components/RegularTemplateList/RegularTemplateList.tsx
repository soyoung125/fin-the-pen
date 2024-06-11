import { Schedule } from "@app/types/schedule.ts";
import { useNavigate } from "react-router-dom";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import { PATH } from "@constants/path.ts";
import TemplateListItem from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem";

export interface RegularTemplateListProps {
  isPending: boolean;
  schedules: Schedule[];
}

function RegularTemplateList({
  schedules,
  isPending,
}: RegularTemplateListProps) {
  const navigate = useNavigate();

  if (isPending) {
    return Array.from({ length: 3 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  return schedules.map((s) => (
    <TemplateListItem
      key={s.schedule_id}
      schedule={s}
      handleClick={() =>
        navigate(`${PATH.DetailInformation}/${s.event_name}/${s.price_type}`)
      }
      arrow
      hideAmount
    />
  ));
}

export default RegularTemplateList;
