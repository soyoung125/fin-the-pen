import { useAppSelector } from "@redux/hooks.ts";
import {
  selectDate,
  selectScheduleForm,
  selectSelectedTemplate,
} from "@redux/slices/scheduleSlice.tsx";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import useSchedule from "@hooks/schedule/useSchedule.ts";
import { Button, Stack, Tooltip } from "@mui/material";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";
import { selectGuestMode } from "@redux/slices/commonSlice.tsx";
import { useUser } from "@app/tanstack-query/useUser.ts";
import { NEED_SIGN_IN } from "@constants/messages.tsx";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

interface CreateFooterInterface {
  handleSubmit: () => boolean;
  handleClose: () => void;
  templateCount: number;
}

function CreateFooter({
  handleSubmit,
  handleClose,
  templateCount,
}: CreateFooterInterface) {
  const date = useAppSelector(selectDate);
  const schedule = useAppSelector(selectScheduleForm);
  const guestMode = useAppSelector(selectGuestMode);
  const template = useAppSelector(selectSelectedTemplate);
  const { data: user } = useUser();
  const { handleCreateSchedule } = useSchedule();
  const { setRandomGeneratedSchedule } = useScheduleForm();
  const { openConfirm } = useDialog();

  const handleCreate = async () => {
    if (!handleSubmit() || !schedule) return;

    if (schedule.repeat.kind_type !== "none" && template.id === -1) {
      const answer = await openConfirm({
        title: "알림",
        content: "반복 일정을 정기템플릿에\n등록하시겠습니까?",
        subContent: `남은 정기템플릿 : ${templateCount}/10`,
        approveText: "네",
        rejectText: "아니오",
      });
      if (answer) {
        await handleCreateSchedule({ ...schedule, register_template: true });
        handleClose();
      } else {
        await handleCreateSchedule({ ...schedule, register_template: false });
        handleClose();
      }
    } else {
      const answer = await openConfirm({
        title: "알림",
        content: "현재 정보로 설정하시겠습니까?",
        approveText: "네",
        rejectText: "아니오",
      });
      if (answer) {
        await handleCreateSchedule({ ...schedule, register_template: false });
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
          랜덤 일정 채우기
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
