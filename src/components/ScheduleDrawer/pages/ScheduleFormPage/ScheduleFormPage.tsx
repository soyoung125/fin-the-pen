import NameInput from "./components/NameInput.tsx";
import CategoryInput from "./components/CategoryInput.tsx";
import { Stack } from "@mui/material";
import ThickDivider from "@components/common/ThickDivider.tsx";
import DateInput from "./components/DateInput";
import RepeatInput from "./components/RepeatInput.tsx";
import { Dispatch, SetStateAction } from "react";
import SelectTemplate from "@components/ScheduleDrawer/pages/ScheduleFormPage/components/SelectTemplate";
import { useScheduleForm } from "@components/ScheduleDrawer/hooks/useScheduleForm.ts";

export interface ScheduleFormPageProps {
  showError: boolean;
  setIsCategoryPickerOpen: Dispatch<SetStateAction<boolean>>;
  setIsRepeatPickerOpen: Dispatch<SetStateAction<boolean>>;
}

function ScheduleFormPage({
  showError,
  setIsCategoryPickerOpen,
  setIsRepeatPickerOpen,
}: ScheduleFormPageProps) {
  const { scheduleForm, getRepeat } = useScheduleForm();

  if (scheduleForm) {
    return (
      <Stack spacing={2} pt={2}>
        <Stack spacing="10px">
          {/* 이벤트 제목 */}
          <NameInput showError={showError} />

          {/* 이벤트 카테고리 */}
          <CategoryInput
            selectedCategory={scheduleForm.category}
            showError={showError}
            onClick={() => setIsCategoryPickerOpen((prev) => !prev)}
          />

          <SelectTemplate />
        </Stack>

        {/* 이벤트 반복 설정 */}
        <RepeatInput
          repeatType={scheduleForm.repeat.kind_type}
          repeatTitle={getRepeat()}
          onClick={() => setIsRepeatPickerOpen((prev) => !prev)}
        />

        <ThickDivider />

        {/* 이벤트 일정 */}
        <DateInput showError={showError} />
      </Stack>
    );
  }

  return <></>;
}

export default ScheduleFormPage;
