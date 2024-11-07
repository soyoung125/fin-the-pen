import { useAppSelector } from "@redux/hooks.ts";
import {
  selectDate,
  selectScheduleForm,
  selectSelectedTemplate,
} from "@redux/slices/scheduleSlice.tsx";
import { SCHEDULE_DRAWER } from "@constants/schedule.ts";
import useSchedule from "@hooks/schedule/useSchedule.ts";
import { Button, Stack } from "@mui/material";
import { useScheduleForm } from "../../hooks/useScheduleForm.ts";
import { useDialog } from "@hooks/dialog/useDialog.tsx";

interface CreateFooterInterface {
  handleSubmit: () => boolean;
  handleClose: () => void;
  templateCount: number;
}

const MAX_TEMPLATE_COUNT = 10;

function CreateFooter({
  handleSubmit,
  handleClose,
  templateCount,
}: CreateFooterInterface) {
  const date = useAppSelector(selectDate);
  const schedule = useAppSelector(selectScheduleForm);
  const template = useAppSelector(selectSelectedTemplate);

  const { handleCreateSchedule } = useSchedule();
  const { setRandomGeneratedSchedule } = useScheduleForm();
  const { openConfirm } = useDialog();

  const handleCreate = async () => {
    if (!handleSubmit() || !schedule) return;

    if (schedule.repeat.kind_type !== "none" && template.id === -1) {
      const answer = await openConfirm({
        title: "알림",
        content:
          templateCount >= MAX_TEMPLATE_COUNT
            ? "정기템플릿을 모두 사용했어요.\n정기템플릿을 추가하시겠습니까?"
            : "반복 일정을 정기템플릿에\n등록하시겠습니까?",
        subContent:
          templateCount >= MAX_TEMPLATE_COUNT
            ? ""
            : `남은 정기템플릿 : ${templateCount}/10`,
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

      <Button variant="contained" fullWidth onClick={handleCreate}>
        {SCHEDULE_DRAWER.add_schedule}
      </Button>
    </Stack>
  );
}

export default CreateFooter;
