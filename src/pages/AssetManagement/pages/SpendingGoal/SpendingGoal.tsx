import useSpendingGoal from "@hooks/assetManagement/useSpendingGoal.ts";
import { Stack } from "@mui/material";
import MonthSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal";
import RegularSpendingGoal from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal";
import { useModal } from "@hooks/modal/useModal.tsx";
import { Form } from "@pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/ModifyRegularSpendingGoal.tsx";
import ConfirmModal from "pages/AssetManagement/pages/SpendingGoal/components/RegularSpendingGoal/components/ConfirmModal";
import { useState } from "react";
import ModifyModal from "pages/AssetManagement/pages/SpendingGoal/components/MonthSpendingGoal/components/ModifyModal";
import { getDate } from "@pages/AssetManagement/pages/SpendingGoal/utils.ts";

function SpendingGoal() {
  const { goal, yearMonth, pickMonth, handleSetSpendingGoal } =
    useSpendingGoal();
  const { openModal, closeModal } = useModal();

  const defaultForm = {
    start_date: yearMonth,
    end_date: yearMonth,
    regular: "OFF" as const,
    is_batch: false,
  };

  const [isModify, setIsModify] = useState(false);

  const handleModify = () => {
    openModal({
      modalElement: (
        <ModifyModal
          closeModal={closeModal}
          value={Number(goal?.spend_goal_amount ?? "")}
          month="5"
          handleSubmit={(v: number) =>
            handleSetSpendingGoal({
              ...defaultForm,
              spend_goal_amount: v.toString(),
            })
          }
        />
      ),
      isBackdropClickable: false,
    });
  };

  const handleSubmit = (form: Form) => {
    if (goal?.start_date !== "?") {
      openModal({
        modalElement: (
          <ConfirmModal
            closeModal={closeModal}
            handleApprove={() => {
              changeRegularGoal(form, true);
            }}
            handleReject={() => {
              changeRegularGoal(form, false);
            }}
          />
        ),
        isBackdropClickable: false,
      });
    } else {
      handleSetSpendingGoal({
        ...form,
        regular: "ON" as const,
        is_batch: true,
      });
    }
  };

  const changeRegularGoal = (form: Form, isBatch: boolean) => {
    handleSetSpendingGoal({
      ...form,
      regular: "ON" as const,
      is_batch: isBatch,
    });
    setIsModify(false);
    closeModal();
  };

  return (
    <Stack spacing={2}>
      <MonthSpendingGoal
        date={yearMonth}
        changeYearAndMonth={pickMonth}
        handleModify={handleModify}
        goal={goal?.spend_goal_amount ?? "0"}
        spent={goal?.spend_amount ?? "0"}
      />
      <RegularSpendingGoal
        handleModify={() => setIsModify(true)}
        handleSubmit={handleSubmit}
        closeModify={() => setIsModify(false)}
        isModify={isModify}
        goal={goal?.spend_goal_amount ?? "0"}
        startDate={getDate(goal?.start_date) ?? yearMonth}
        endDate={getDate(goal?.end_date) ?? yearMonth}
      />
    </Stack>
  );
}

export default SpendingGoal;
