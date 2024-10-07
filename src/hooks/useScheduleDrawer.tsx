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
import { ModifyTemplateSchedule } from "@app/types/template.ts";
import CategoryPicker from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/CategoryPicker";
import { useToast } from "@hooks/toast/useToast.tsx";
import { Stack, Typography } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import React from "react";

export const useScheduleDrawer = () => {
  const { openDrawer, closeDrawer } = useSwipeableDrawer();
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(selectScheduleForm);
  const { openToast } = useToast();

  const handleClickToastOpen = () => {
    openToast({
      hideDuration: 5000,
      toastElement: (
        <Stack direction={"row"} spacing={1} alignItems={"center"} p={1}>
          <CancelRoundedIcon color={"error"} />
          <Typography flexGrow={1}>자산 정보만 수정이 가능해요!</Typography>
        </Stack>
      ),
      color: "#36383D",
    });
  };

  const openScheduleDrawer = (data: RequestSchedule) => {
    const resetSchedule = () => {
      dispatch(setDrawerScheduleForm(data));
      dispatch(resetSelectedTemplate());
    };

    if (schedule?.schedule_id !== data.schedule_id) {
      resetSchedule();
    }
    if (!schedule?.schedule_id && data.start_date !== schedule?.start_date) {
      resetSchedule();
    }

    openDrawer(
      <ScheduleDrawer handleClose={closeDrawer} resetSchedule={resetSchedule} />
    );
  };

  const openScheduleAssetDrawer = (
    data: RequestSchedule,
    handleModify: (data: ModifyTemplateSchedule) => void,
    count?: number
  ) => {
    const schedule = { ...data, price_type: getPriceTypeSign(data.price_type) };
    dispatch(setDrawerScheduleForm(schedule));
    const resetSchedule = () => dispatch(setDrawerScheduleForm(schedule));

    handleClickToastOpen();

    openDrawer(
      <ScheduleAssetDrawer
        handleClose={closeDrawer}
        resetSchedule={resetSchedule}
        count={count}
        handleModify={handleModify}
      />
    );
  };

  const openCategoryDrawer = (category: string): Promise<string> => {
    return new Promise((resolve) => {
      openDrawer(
        <CategoryPicker
          closeCategoryPicker={() => {
            resolve(category);
            closeDrawer();
          }}
          category={category}
          setCategory={(c: string) => {
            resolve(c);
            closeDrawer();
          }}
        />
      );
    });
  };

  return {
    openScheduleDrawer,
    openScheduleAssetDrawer,
    openCategoryDrawer,
    closeScheduleDrawer: closeDrawer,
  };
};
