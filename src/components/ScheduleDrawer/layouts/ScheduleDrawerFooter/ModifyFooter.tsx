import { useAppSelector } from "@redux/hooks.ts";
import { selectScheduleForm } from "@redux/slices/scheduleSlice.tsx";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import useSchedule from "@hooks/schedule/useSchedule.ts";
import { Button, Stack } from "@mui/material";
import { useScheduleChangeModal } from "@components/ScheduleDrawer/hooks/ScheduleChangeModal/useScheduleChangeModal.tsx";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

export interface ModifyFooterInterface {
  handleSubmit: () => boolean | Promise<void>;
  handleClose: () => void;
}

function ModifyFooter({ handleSubmit, handleClose }: ModifyFooterInterface) {
  const schedule = useAppSelector(selectScheduleForm);
  const { handleModifySchedule, handleDeleteSchedule } = useSchedule();
  const { openModal } = useScheduleChangeModal();
  const { openConfirm } = useDialog();

  const handleModify = async () => {
    if (!handleSubmit() || !schedule) return;
    const answer =
      schedule.repeat_kind !== "NONE"
        ? await openModal({
            changeMode: "수정",
          })
        : await openConfirm({
            title: "알림",
            content: "정보를 수정하시겠습니까?",
            approveText: "네",
            rejectText: "아니오",
          });
    if (answer) {
      handleModifySchedule(schedule, answer === true ? "all" : answer);
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (!schedule) return;
    const answer =
      schedule.repeat_kind !== "NONE"
        ? await openModal({
            changeMode: "삭제",
          })
        : await openConfirm({
            title: "알림",
            content: "정보를 삭제하시겠습니까?",
            approveText: "네",
            rejectText: "아니오",
          });
    if (answer) {
      handleDeleteSchedule(schedule, answer === true ? "all" : answer);
      handleClose();
    }
  };

  return (
    <Stack direction="row" spacing={1} mx={2.5} mt={1}>
      <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={handleDelete}
      >
        {SCHEDULE_DRAWER.delete_schedule}
      </Button>
      <Button variant="contained" fullWidth onClick={handleModify}>
        {SCHEDULE_DRAWER.modify_schedule}
      </Button>
    </Stack>
  );
}

export default ModifyFooter;
