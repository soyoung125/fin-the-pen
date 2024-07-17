import { RequestSchedule } from "@app/types/schedule.ts";
import ScheduleDrawer from "@components/ScheduleDrawer";
import {
  resetSelectedTemplate,
  selectScheduleForm,
  setDrawerScheduleForm,
} from "@redux/slices/scheduleSlice.tsx";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import { useSwipeableDrawer } from "@hooks/useSwipeableDrawer.tsx";
import ScheduleAssetDrawer from "@components/ScheduleDrawer/ScheduleAssetDrawer.tsx";
import { getPriceTypeSign } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";
import { ModifyTemplateRequest } from "@app/types/template.ts";

export const useScheduleDrawer = () => {
  const { openDrawer, closeDrawer } = useSwipeableDrawer();
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(selectScheduleForm);

  const openScheduleDrawer = (data: RequestSchedule) => {
    if (schedule?.schedule_id !== data.schedule_id)
      dispatch(setDrawerScheduleForm(data));
    if (!schedule?.schedule_id && data.start_date !== schedule?.start_date)
      dispatch(setDrawerScheduleForm(data));

    const resetSchedule = () => {
      dispatch(setDrawerScheduleForm(data));
      dispatch(resetSelectedTemplate());
    };

    openDrawer(
      <ScheduleDrawer handleClose={closeDrawer} resetSchedule={resetSchedule} />
    );
  };

  const openScheduleAssetDrawer = (
    data: RequestSchedule,
    count: number,
    handleModify: () => void
  ) => {
    const schedule = { ...data, price_type: getPriceTypeSign(data.price_type) };
    dispatch(setDrawerScheduleForm(schedule));
    const resetSchedule = () => dispatch(setDrawerScheduleForm(schedule));

    openDrawer(
      <ScheduleAssetDrawer
        handleClose={closeDrawer}
        resetSchedule={resetSchedule}
        count={count}
        handleModify={handleModify}
      />
    );
  };

  return {
    openScheduleDrawer,
    openScheduleAssetDrawer,
    closeScheduleDrawer: closeDrawer,
  };
};
