import { useAppSelector } from "@redux/hooks.ts";
import {
  selectDate,
  selectScheduleForm,
} from "@redux/slices/scheduleSlice.tsx";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import useSchedule from "@hooks/useSchedule.ts";
import { Button, Stack, Tooltip } from "@mui/material";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";
import { selectGuestMode } from "@redux/slices/commonSlice.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { NEED_SIGN_IN } from "@constants/messages.tsx";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

interface CreateFooterInterface {
  handleSubmit: () => boolean;
  handleClose: () => void;
}

function CreateFooter({ handleSubmit, handleClose }: CreateFooterInterface) {
  const date = useAppSelector(selectDate);
  const schedule = useAppSelector(selectScheduleForm);
  const guestMode = useAppSelector(selectGuestMode);
  const { data: user } = useUser();
  const { handleCreateSchedule } = useSchedule();
  const { setRandomGeneratedSchedule } = useScheduleForm();
  const { openConfirm } = useDialog();

  const handleCreate = async () => {
    if (handleSubmit() && schedule) {
      const answer = await openConfirm({
        title: "알림",
        content: "현재 정보로 설정하시겠습니까?",
        approveText: "네",
        rejectText: "아니오",
      });
      if (answer) {
        handleCreateSchedule(schedule);
        handleClose();
      }
    }
  };

  return (
    <Stack direction="row" spacing={1} mx={2.5} mt={1}>
      {process.env.NODE_ENV === "development" && (
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={() => setRandomGeneratedSchedule(date)}
        >
          랜덤 일정 채우기(dev)
        </Button>
      )}
      <Tooltip
        title={!guestMode && "아직 일반 모드에서는 동작하지 않습니다."}
        placement="top"
      >
        <Button
          variant="contained"
          fullWidth
          disabled={!user}
          onClick={handleCreate}
        >
          {!user ? NEED_SIGN_IN : `${SCHEDULE_DRAWER.add_schedule}`}
        </Button>
      </Tooltip>
    </Stack>
  );
}

export default CreateFooter;
