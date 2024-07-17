import RegularScheduleCard from "pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleCard";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import React from "react";
import { Schedule } from "@app/types/schedule.ts";
import { SCHEDULE_REQUEST } from "@constants/schedule.ts";
import { useScheduleDrawer } from "@hooks/useScheduleDrawer.tsx";
import Modify from "@assets/icons/modify_white.svg";
import { ModifyButtonContainer } from "@pages/AssetManagement/pages/RegularAsset/pages/RegularAssetDetail/components/RegularScheduleList/ModifButton.styles.ts";
import useRegularAssetInfo from "@hooks/assetManagement/RegularTemplate/useRegularAssetInfo.ts";
import { useRegularAssetDrawer } from "@hooks/assetManagement/RegularTemplate/useRegularAssetDrawer.tsx";

export interface RegularScheduleListProps {
  isPending: boolean;
  schedules: Schedule[];
}

function RegularScheduleList({
  schedules,
  isPending,
}: RegularScheduleListProps) {
  const { openDeleteAssetDrawer } = useRegularAssetDrawer();
  const { openScheduleAssetDrawer } = useScheduleDrawer();
  const { handleModifyTemplateSchedule } = useRegularAssetInfo();

  if (isPending) {
    return Array.from({ length: 6 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  const handleModal = (schedule: Schedule) => {
    schedule &&
      openScheduleAssetDrawer(SCHEDULE_REQUEST(schedule), (data) =>
        handleModifyTemplateSchedule(schedule.schedule_id ?? "", data)
      );
  };

  return (
    <>
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
      <ModifyButtonContainer onClick={openDeleteAssetDrawer}>
        <img src={Modify} alt="modify" />
      </ModifyButtonContainer>
    </>
  );
}

export default RegularScheduleList;
