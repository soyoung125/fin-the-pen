import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { useAppDispatch } from "@redux/hooks.ts";
import { setDrawerScheduleForm } from "@redux/slices/scheduleSlice.tsx";
import { RequestSchedule } from "@app/types/schedule.ts";
import RegularAssetDrawer from "@components/assetManagement/RegularAssetDrawer";

export const useRegularAssetDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const dispatch = useAppDispatch();

  const openRegularAssetDrawer = (data: RequestSchedule, title: string) => {
    dispatch(setDrawerScheduleForm(data));

    openOverlay(
      <RegularAssetDrawer closeDrawer={closeOverlay} title={title} />
    );
  };

  return { openRegularAssetDrawer, closeScheduleDrawer: closeOverlay };
};
