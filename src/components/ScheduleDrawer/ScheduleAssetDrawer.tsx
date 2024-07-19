import { Box } from "@mui/material";
import AssetFormPage from "./pages/AssetFormPage";
import ScheduleDrawerHeader from "./layouts/ScheduleDrawerHeader/ScheduleDrawerHeader.tsx";
import { useDialog } from "@hooks/dialog/useDialog.tsx";
import { ScheduleDrawerProps } from "@components/ScheduleDrawer/ScheduleDrawer.tsx";
import {
  ActionContainer,
  FooterContainer,
} from "@components/ScheduleDrawer/layouts/ScheduleDrawerFooter/ScheduleDrawerFooter.style.ts";
import TemplateModifyFooter from "@components/ScheduleDrawer/layouts/ScheduleDrawerFooter/TemplateModifyFooter.tsx";
import { ModifyTemplateSchedule } from "@app/types/template.ts";

interface ScheduleDrawerFooterProps extends ScheduleDrawerProps {
  handleModify: (data: ModifyTemplateSchedule) => void;
  count?: number;
}

function ScheduleAssetDrawer({
  handleClose,
  resetSchedule,
  handleModify,
  count,
}: ScheduleDrawerFooterProps) {
  const { openConfirm } = useDialog();

  const handleReset = async () => {
    const answer = await openConfirm({
      title: "알림",
      content: "모든 정보를 초기화하시겠습니까?",
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      resetSchedule();
    }
  };

  const handleClick = async (data: ModifyTemplateSchedule) => {
    const msg = count
      ? `${count}건 일정의 자산 정보를 수정하시겠습니까?`
      : "일정의 자산 정보를 수정하시겠습니까?";

    const answer = await openConfirm({
      title: "알림",
      content: msg,
      approveText: "네",
      rejectText: "아니오",
    });
    if (answer) {
      handleModify(data);
      handleClose();
    }
  };

  return (
    <Box>
      <ScheduleDrawerHeader value={1} handleReset={handleReset} />

      <AssetFormPage />

      {/* 제출 버튼 */}
      <FooterContainer>
        <ActionContainer>
          <TemplateModifyFooter handleClick={handleClick} />
        </ActionContainer>
      </FooterContainer>
    </Box>
  );
}

export default ScheduleAssetDrawer;
