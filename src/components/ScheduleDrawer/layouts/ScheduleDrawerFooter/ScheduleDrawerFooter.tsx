import { Divider } from "@mui/material";
import { selectScheduleForm } from "@redux/slices/scheduleSlice.tsx";
import { RequestSchedule } from "@app/types/schedule.ts";
import { useAppSelector } from "@redux/hooks.ts";
import Save from "@assets/icons/save_icon.svg";
import ModifyFooter from "./ModifyFooter.tsx";
import CreateFooter from "./CreateFooter.tsx";
import {
  ActionContainer,
  AutoSaveContainer,
  FooterContainer,
} from "@components/ScheduleDrawer/layouts/ScheduleDrawerFooter/ScheduleDrawerFooter.style.ts";

interface ScheduleDrawerFooterProps {
  handleClose: () => void;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  templateCount: number;
}

function ScheduleDrawerFooter({
  handleClose,
  setShowError,
  templateCount,
}: ScheduleDrawerFooterProps) {
  const schedule = useAppSelector(selectScheduleForm) as RequestSchedule;

  const handleSubmit = () => {
    if (
      schedule.event_name === "" ||
      schedule.category === "" ||
      schedule.start_date === "" ||
      schedule.end_date === ""
    ) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  return (
    <FooterContainer>
      <AutoSaveContainer>
        <img src={Save} alt="save" />
        입력 정보는 자동으로 저장됩니다.
      </AutoSaveContainer>

      <ActionContainer>
        <Divider />

        {schedule && schedule.schedule_id ? (
          <ModifyFooter handleSubmit={handleSubmit} handleClose={handleClose} />
        ) : (
          <CreateFooter
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            templateCount={templateCount}
          />
        )}
      </ActionContainer>
    </FooterContainer>
  );
}

export default ScheduleDrawerFooter;
