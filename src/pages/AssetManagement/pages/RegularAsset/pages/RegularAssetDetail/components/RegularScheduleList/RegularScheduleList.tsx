import RegularScheduleCard from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleCard";
import moment from "moment";
import { Stack } from "@mui/material";
import { RegularScheduleListProps } from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleList/RegularScheduleList.tsx";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import ScheduleListHeader from "@components/ScheduleList/ScheduleListHeader";
import React, { useState } from "react";

interface ListProps extends RegularScheduleListProps {
  options: string[];
}

function RegularScheduleList({ schedules, isPending, options }: ListProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  if (isPending) {
    return Array.from({ length: 6 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

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
          title={moment(s.start_date).format("YYYY.MM.DD")}
          category={s.category}
          priceType={s.price_type}
          eventName={s.event_name}
          amount={Number(s.amount)}
          isPredict={moment().isBefore(s.end_date, "day")}
          isRepeat={s.repeat_kind !== "NONE"}
          onClick={() => alert("")}
          icon
        />
      ))}
    </Stack>
  );
}

export default RegularScheduleList;
