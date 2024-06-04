import RegularScheduleCard from "pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard";
import { Stack } from "@mui/material";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import ScheduleListHeader from "@components/ScheduleList/ScheduleListHeader";
import React, { useState } from "react";
import { Schedule } from "@app/types/schedule.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import { RegularTemplateListProps } from "@pages/AssetManagement/pages/RegularAsset/components/RegularTemplateList/RegularTemplateList.tsx";

interface ListProps extends RegularTemplateListProps {
  options: string[];
}

function RegularScheduleList({ schedules, isPending, options }: ListProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { openScheduleDrawer } = useScheduleDrawer();

  if (isPending) {
    return Array.from({ length: 6 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  const handleModal = (schedule: Schedule) => {
    if (schedule) {
      openScheduleDrawer(SCHEDULE_REQUEST(schedule));
    }
  };

  return (
    <Stack>
      <ScheduleListHeader
        count={schedules.length}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {schedules.map((s) => (
        <RegularScheduleCard
          key={s.schedule_id}
          priceType={s.price_type}
          eventName={s.event_name}
          amount={Number(s.amount)}
          date={s.start_date}
          onClick={() => handleModal(s)}
        />
      ))}
    </Stack>
  );
}

export default RegularScheduleList;
