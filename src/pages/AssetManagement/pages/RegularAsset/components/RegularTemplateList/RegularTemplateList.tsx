import { useNavigate } from "react-router-dom";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import { PATH } from "@constants/path.ts";
import TemplateListItem from "@components/TemplateDrawer/pages/TemplateList/components/TemplateListItem";
import { Template } from "@app/types/template.ts";

export interface RegularTemplateListProps {
  isPending: boolean;
  schedules: Template[];
}

function RegularTemplateList({
  schedules,
  isPending,
}: RegularTemplateListProps) {
  const navigate = useNavigate();

  if (isPending) {
    return Array.from({ length: 3 }, () => 0).map((_, idx) => (
      <ScheduleCardSkeleton key={idx} />
    ));
  }

  return schedules.map((s, idx) => (
    <TemplateListItem
      key={`${s.template_name}_${idx}`}
      schedule={s}
      handleClick={() => navigate(`${PATH.DetailInformation}/${s.id}`)}
      arrow
      hideAmount
    />
  ));
}

export default RegularTemplateList;
