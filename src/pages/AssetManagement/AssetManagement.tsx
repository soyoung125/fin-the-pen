/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { Box, Stack } from "@mui/material";
import moment from "moment/moment";
import { useEffect } from "react";
import ScheduleStatusCard from "./components/ScheduleStatusCard";
import SettingsPaper from "./components/SettingsPaper";
import useSchedule from "@hooks/schedule/useSchedule.ts";
import useHeader from "@hooks/useHeader.ts";
import { HEADER_MODE } from "@app/types/common.ts";
import { useAppDispatch } from "@redux/hooks.ts";
import { setIsAuthenticatedFalse } from "@redux/slices/commonSlice.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import ThickDivider from "@components/common/ThickDivider.tsx";

function AssetManagement() {
  const dispatch = useAppDispatch();
  const { schedules, data } = useSchedule();
  const { data: user } = useUser();

  const today = moment();

  useHeader(true, HEADER_MODE.home);

  useEffect(() => {
    dispatch(setIsAuthenticatedFalse());
  }, []);

  return (
    <Stack mt={2.5} spacing={5}>
      <Stack spacing={3} px={2.5}>
        <Box
          sx={{
            typography: "h2",
            whiteSpace: "pre-line",
            lineHeight: "24px",
            color: "#5B5F67",
          }}
        >
          {`핀더펜과 함께 `}
          <span style={{ color: "#735BF2", fontWeight: 700 }}>
            {user?.name}
          </span>
          {`님의\n자산 플랜을 세워보세요 !`}
        </Box>
        <SettingsPaper />
      </Stack>

      <ThickDivider />

      <ScheduleStatusCard
        month={today.format("M월")}
        numberOfSchedule={
          schedules?.filter(
            (s) =>
              today.isSame(s.start_date, "month") &&
              today.isSameOrBefore(
                moment(s.start_date + s.start_time, "YYYY-MM-DDhh:mm")
              )
          ).length ?? 0
        }
        available={parseInt(data?.available ?? "")}
      />
    </Stack>
  );
}

export default AssetManagement;
