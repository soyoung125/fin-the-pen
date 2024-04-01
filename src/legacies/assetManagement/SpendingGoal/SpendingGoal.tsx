import useSpendingGoal from "@hooks/assetManagement/useSpendingGoal.ts";
import { Stack } from "@mui/material";
import MonthSpendingGoal from "@legacies/assetManagement/SpendingGoal/components/MonthSpendingGoal";
import RegularSpendingGoal from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal";
import { useModal } from "@hooks/modal/useModal.tsx";
import { Form } from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/ModifyRegularSpendingGoal.tsx";
import ConfirmModal from "@legacies/assetManagement/SpendingGoal/components/RegularSpendingGoal/components/ConfirmModal";
import { useState } from "react";

function SpendingGoal() {
  const { goal, isError, isPending, yearMonth, pickMonth } = useSpendingGoal();
  const { openModal, closeModal } = useModal();

  const [isModify, setIsModify] = useState(false);

  const handleSubmit = (form: Form) => {
    if (goal) {
      openModal({
        modalElement: (
          <ConfirmModal
            closeModal={closeModal}
            handleApprove={() => {
              alert("지출 목표 변경");
              closeModal();
            }}
            handleReject={() => {
              alert("지출 목표 유지");
              closeModal();
            }}
          />
        ),
        isBackdropClickable: false,
      });
    }
    setIsModify(false);
  };

  return (
    <Stack spacing={2}>
      <MonthSpendingGoal
        date={yearMonth}
        changeYearAndMonth={pickMonth}
        handleModify={() => alert("modify")}
        goal={goal?.spend_goal_amount ?? "0"}
        spent={goal?.spend_amount ?? "0"}
      />
      <RegularSpendingGoal
        handleModify={() => setIsModify(true)}
        handleSubmit={handleSubmit}
        closeModify={() => setIsModify(false)}
        isModify={isModify}
        goal={goal?.spend_goal_amount ?? "0"}
        startDate={goal?.start_date ?? yearMonth}
        endDate={goal?.end_date ?? yearMonth}
      />
    </Stack>
  );
}

export default SpendingGoal;
