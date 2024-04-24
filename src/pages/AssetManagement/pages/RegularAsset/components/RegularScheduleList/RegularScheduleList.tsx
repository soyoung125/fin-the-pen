import { Schedule } from "@app/types/schedule.ts";
import { Stack } from "@mui/material";
import moment from "moment/moment";
import RegularScheduleCard from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleCard";
import ScheduleCardSkeleton from "@components/ScheduleList/ScheduleCard/ScheduleCardSkeleton.tsx";
import AddRegularSchedule from "@pages/AssetManagement/pages/RegularAsset/components/AddRegularSchedule/AddRegularSchedule.tsx";
import { getTitle } from "@pages/AssetManagement/pages/RegularAsset/components/RegularScheduleList/utils.ts";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constants/path.ts";
import { useRegularAssetDrawer } from "@hooks/assetManagement/useRegularAssetDrawer.tsx";
import { INIT_SCHEDULE } from "@constants/schedule.ts";

export interface RegularScheduleListProps {
  isPending: boolean;
  schedules: Schedule[];
}

function RegularScheduleList({
  schedules,
  isPending,
}: RegularScheduleListProps) {
  const navigate = useNavigate();
  const { openRegularAssetDrawer } = useRegularAssetDrawer();

  if (isPending) {
    return Array.from({ length: 3 }, () => 0).map((num) => (
      <ScheduleCardSkeleton key={num} />
    ));
  }

  return (
    <Stack>
      {schedules.map((s) => (
        <RegularScheduleCard
          key={s.schedule_id}
          title={getTitle(s)}
          category={s.category}
          priceType={s.price_type}
          eventName={s.event_name}
          amount={Number(s.amount)}
          isPredict={moment().isBefore(s.end_date, "day")}
          isRepeat={s.repeat_kind !== "NONE"}
          onClick={() =>
            navigate(
              `${PATH.DetailInformation}/${s.event_name}/${s.price_type}`
            )
          }
          icon
        />
      ))}
      <AddRegularSchedule
        navigateTo={() =>
          openRegularAssetDrawer(
            INIT_SCHEDULE(moment().format("YYYY-MM-DD")),
            "새일정"
          )
        }
      />
    </Stack>
  );
}

export default RegularScheduleList;
