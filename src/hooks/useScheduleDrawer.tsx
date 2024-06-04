import { useOverlay } from "@hooks/use-overlay/useOverlay.tsx";
import { RequestSchedule } from "@app/types/schedule.ts";
import { Box, SwipeableDrawer } from "@mui/material";
import ScheduleDrawer from "@components/ScheduleDrawer";
import {
  selectScheduleForm,
  setDrawerScheduleForm,
} from "@redux/slices/scheduleSlice.tsx";
import { useAppDispatch, useAppSelector } from "@redux/hooks.ts";
import CssBaseline from "@mui/material/CssBaseline";

export const useScheduleDrawer = () => {
  const { openOverlay, closeOverlay } = useOverlay();
  const dispatch = useAppDispatch();
  const schedule = useAppSelector(selectScheduleForm);
  const toggleDrawer = (newOpen: boolean) => () => {
    !newOpen && closeOverlay();
  };

  const openScheduleDrawer = (data: RequestSchedule) => {
    if (schedule?.schedule_id !== data.schedule_id)
      dispatch(setDrawerScheduleForm(data));
    if (!schedule?.schedule_id && data.start_date !== schedule?.start_date)
      dispatch(setDrawerScheduleForm(data));

    const resetSchedule = () => dispatch(setDrawerScheduleForm(data));

    openOverlay(
      <Box>
        <CssBaseline />
        <SwipeableDrawer
          anchor="bottom"
          open={true}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            style: {
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              height: "calc(100dvh - 48px)",
            },
          }}
        >
          <ScheduleDrawer
            handleClose={closeOverlay}
            resetSchedule={resetSchedule}
          />
        </SwipeableDrawer>
      </Box>
    );
  };

  return { openScheduleDrawer, closeScheduleDrawer: closeOverlay };
};
